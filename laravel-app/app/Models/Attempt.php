<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attempt extends Model
{
    protected $fillable = ['game_session_id', 'exercise_key', 'chosen', 'is_correct', 'attempt_no', 'response_ms'];

    protected $casts = ['is_correct' => 'boolean'];

    public function session(): BelongsTo
    {
        return $this->belongsTo(GameSession::class, 'game_session_id');
    }
}
