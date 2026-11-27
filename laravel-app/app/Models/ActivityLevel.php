<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityLevel extends Model
{
    protected $fillable = ['activity_id', 'grade_year', 'level', 'title', 'instruction'];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }
}
