<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPreference extends Model
{
    protected $fillable = ['user_id', 'dark_mode', 'high_contrast', 'font_scale', 'sound_on', 'calm_mode'];

    protected $casts = [
        'dark_mode' => 'boolean',
        'high_contrast' => 'boolean',
        'sound_on' => 'boolean',
        'calm_mode' => 'boolean',
        'font_scale' => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
