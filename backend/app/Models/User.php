<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['name', 'email', 'google_id', 'password', 'grade_year'];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = ['grade_year' => 'integer'];

    public function preference(): HasOne
    {
        return $this->hasOne(UserPreference::class);
    }

    public function gameSessions(): HasMany
    {
        return $this->hasMany(GameSession::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(Progress::class);
    }
}
