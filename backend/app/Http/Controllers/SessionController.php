<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\GameSession;
use App\Models\Progress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class SessionController extends Controller
{
    /** Registra uma fase concluída (com as tentativas) e atualiza o melhor resultado. */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'activity' => ['required', 'string', 'exists:activities,slug'],
            'grade_year' => ['required', Rule::in([1, 2])],
            'level' => ['required', 'integer', 'between:1,3'],
            'correct' => ['required', 'integer', 'min:0', 'max:100'],
            'total' => ['required', 'integer', 'min:1', 'max:100'],
            'mistakes' => ['required', 'integer', 'min:0', 'max:1000'],
            'hints' => ['required', 'integer', 'min:0', 'max:1000'],
            'stars' => ['required', 'integer', 'between:1,3'],
            'duration_seconds' => ['nullable', 'integer', 'min:0', 'max:86400'],
            'attempts' => ['nullable', 'array', 'max:300'],
            'attempts.*.exercise_key' => ['required', 'string', 'max:40'],
            'attempts.*.chosen' => ['nullable', 'string', 'max:60'],
            'attempts.*.is_correct' => ['required', 'boolean'],
            'attempts.*.attempt_no' => ['nullable', 'integer', 'min:1', 'max:255'],
            'attempts.*.response_ms' => ['nullable', 'integer', 'min:0'],
        ]);

        $user = $request->user();
        $activity = Activity::where('slug', $data['activity'])->firstOrFail();

        $result = DB::transaction(function () use ($data, $user, $activity) {
            $session = GameSession::create([
                'user_id' => $user->id,
                'activity_id' => $activity->id,
                'grade_year' => $data['grade_year'],
                'level' => $data['level'],
                'correct' => $data['correct'],
                'total' => $data['total'],
                'mistakes' => $data['mistakes'],
                'hints' => $data['hints'],
                'stars' => $data['stars'],
                'duration_seconds' => $data['duration_seconds'] ?? 0,
                'played_at' => now(),
            ]);

            foreach ($data['attempts'] ?? [] as $attempt) {
                $session->attempts()->create([
                    'exercise_key' => $attempt['exercise_key'],
                    'chosen' => $attempt['chosen'] ?? null,
                    'is_correct' => $attempt['is_correct'],
                    'attempt_no' => $attempt['attempt_no'] ?? 1,
                    'response_ms' => $attempt['response_ms'] ?? null,
                ]);
            }

            $progress = Progress::firstOrNew([
                'user_id' => $user->id,
                'activity_id' => $activity->id,
                'grade_year' => $data['grade_year'],
                'level' => $data['level'],
            ]);
            $progress->sessions_count = ($progress->sessions_count ?? 0) + 1;
            if ($data['stars'] > ($progress->stars ?? 0)) {
                $progress->stars = $data['stars'];
                $progress->best_at = now();
            }
            $progress->save();

            return [$session, $progress];
        });

        return response()->json([
            'session_id' => $result[0]->id,
            'progress' => ['activity' => $activity->slug, 'grade_year' => $result[1]->grade_year, 'level' => $result[1]->level, 'stars' => $result[1]->stars],
        ], 201);
    }
}
