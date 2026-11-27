<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Progress extends Model
{
    protected $table = 'progress';

    protected $fillable = ['user_id', 'activity_id', 'grade_year', 'level', 'stars', 'sessions_count', 'best_at'];

    protected $casts = ['best_at' => 'datetime'];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }
}
