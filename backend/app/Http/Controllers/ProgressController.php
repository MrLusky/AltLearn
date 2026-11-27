<?php

namespace App\Http\Controllers;

use App\Models\GameSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $rows = $user->progress()->with('activity:id,slug')->get()->map(fn ($p) => [
            'activity' => $p->activity->slug,
            'grade_year' => $p->grade_year,
            'level' => $p->level,
            'stars' => $p->stars,
            'sessions_count' => $p->sessions_count,
            'best_at' => $p->best_at?->toIso8601String(),
        ]);

        return response()->json([
            'progress' => $rows,
            'totals' => [
                'stars' => $rows->sum('stars'),
                'sessions' => GameSession::where('user_id', $user->id)->count(),
            ],
        ]);
    }
}
