<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /** Catálogo de atividades com as fases de cada ano. */
    public function index(): JsonResponse
    {
        $activities = Activity::with('levels')->orderBy('sort_order')->get()->map(fn (Activity $a) => [
            'slug' => $a->slug,
            'title' => $a->title,
            'subject' => $a->subject,
            'category' => $a->category,
            'description' => $a->description,
            'adult_note' => $a->adult_note,
            'bncc_codes' => $a->bncc_codes,
            'levels' => $a->levels->map(fn ($l) => [
                'grade_year' => $l->grade_year,
                'level' => $l->level,
                'title' => $l->title,
                'instruction' => $l->instruction,
            ]),
        ]);

        return response()->json(['activities' => $activities]);
    }

    /** Exercícios de uma atividade (opcionalmente filtrados por ?ano= e ?nivel=). */
    public function show(Request $request, string $slug): JsonResponse
    {
        $activity = Activity::where('slug', $slug)->firstOrFail();

        $query = $activity->exercises();
        if ($request->filled('ano')) {
            $query->where('grade_year', (int) $request->query('ano'));
        }
        if ($request->filled('nivel')) {
            $query->where('level', (int) $request->query('nivel'));
        }

        return response()->json([
            'activity' => ['slug' => $activity->slug, 'title' => $activity->title],
            'exercises' => $query->get()->map(fn ($e) => [
                'key' => $e->exercise_key,
                'grade_year' => $e->grade_year,
                'level' => $e->level,
                'kind' => $e->kind,
                'content' => $e->payload,
            ]),
        ]);
    }
}
