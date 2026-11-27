<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Popula atividades, fases e exercícios a partir de data/activities.json,
 * gerado pelo frontend (node scripts/export-content.mjs) — a mesma fonte usada nos jogos.
 * Pode rodar várias vezes: usa updateOrCreate.
 */
class ActivitySeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('seeders/data/activities.json');
        $activities = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);

        DB::transaction(function () use ($activities) {
            foreach ($activities as $data) {
                $activity = Activity::updateOrCreate(
                    ['slug' => $data['slug']],
                    [
                        'title' => $data['title'],
                        'subject' => $data['subject'],
                        'category' => $data['category'],
                        'description' => $data['description'],
                        'adult_note' => $data['adult_note'] ?? null,
                        'bncc_codes' => $data['bncc_codes'],
                        'sort_order' => $data['sort_order'],
                    ]
                );

                foreach ($data['levels'] as $level) {
                    $activity->levels()->updateOrCreate(
                        ['grade_year' => $level['year'], 'level' => $level['level']],
                        ['title' => $level['title'], 'instruction' => $level['instruction']]
                    );

                    foreach ($level['exercises'] as $position => $exercise) {
                        $activity->exercises()->updateOrCreate(
                            ['exercise_key' => $exercise['id']],
                            [
                                'grade_year' => $level['year'],
                                'level' => $level['level'],
                                'position' => $position + 1,
                                'kind' => $exercise['type'],
                                'payload' => $exercise,
                            ]
                        );
                    }
                }
            }
        });
    }
}
