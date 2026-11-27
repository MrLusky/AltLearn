<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exercise extends Model
{
    protected $fillable = ['activity_id', 'exercise_key', 'grade_year', 'level', 'position', 'kind', 'payload'];

    protected $casts = ['payload' => 'array'];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }
}
