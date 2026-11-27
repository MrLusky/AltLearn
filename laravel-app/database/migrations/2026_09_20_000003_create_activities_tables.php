<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 60)->unique();
            $table->string('title');
            $table->string('subject');
            $table->string('category');
            $table->text('description');
            $table->text('adult_note')->nullable();
            $table->json('bncc_codes'); // habilidades da BNCC relacionadas (alinhamento inicial)
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('activity_levels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('grade_year');
            $table->unsignedTinyInteger('level');
            $table->string('title');
            $table->string('instruction');
            $table->timestamps();
            $table->unique(['activity_id', 'grade_year', 'level']);
        });

        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->constrained()->cascadeOnDelete();
            $table->string('exercise_key', 40)->unique(); // ex.: ip-1-1-3 (mesmo id usado no frontend)
            $table->unsignedTinyInteger('grade_year');
            $table->unsignedTinyInteger('level');
            $table->unsignedSmallInteger('position');
            $table->string('kind', 30);
            $table->json('payload');
            $table->timestamps();
            $table->index(['activity_id', 'grade_year', 'level']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercises');
        Schema::dropIfExists('activity_levels');
        Schema::dropIfExists('activities');
    }
};
