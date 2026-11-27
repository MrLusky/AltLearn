<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('activity_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('grade_year');
            $table->unsignedTinyInteger('level');
            $table->unsignedSmallInteger('correct')->default(0);
            $table->unsignedSmallInteger('total')->default(0);
            $table->unsignedSmallInteger('mistakes')->default(0);
            $table->unsignedSmallInteger('hints')->default(0);
            $table->unsignedTinyInteger('stars')->default(1);
            $table->unsignedInteger('duration_seconds')->default(0);
            $table->timestamp('played_at')->useCurrent();
            $table->timestamps();
            $table->index(['user_id', 'played_at']);
        });

        Schema::create('attempts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_session_id')->constrained()->cascadeOnDelete();
            $table->string('exercise_key', 40);
            $table->string('chosen', 60)->nullable();
            $table->boolean('is_correct');
            $table->unsignedTinyInteger('attempt_no')->default(1);
            $table->unsignedInteger('response_ms')->nullable();
            $table->timestamps();
            $table->index('exercise_key');
        });

        // Melhor resultado por usuário/atividade/ano/fase (consulta rápida para a área do estudante).
        Schema::create('progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('activity_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('grade_year');
            $table->unsignedTinyInteger('level');
            $table->unsignedTinyInteger('stars')->default(0);
            $table->unsignedInteger('sessions_count')->default(0);
            $table->timestamp('best_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'activity_id', 'grade_year', 'level'], 'progress_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progress');
        Schema::dropIfExists('attempts');
        Schema::dropIfExists('game_sessions');
    }
};
