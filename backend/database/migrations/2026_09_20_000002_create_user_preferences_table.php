<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->boolean('dark_mode')->default(false);
            $table->boolean('high_contrast')->default(false);
            $table->decimal('font_scale', 3, 2)->default(1.00); // 1.00 | 1.20 | 1.40 | 1.60
            $table->boolean('sound_on')->default(true);
            $table->boolean('calm_mode')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_preferences');
    }
};
