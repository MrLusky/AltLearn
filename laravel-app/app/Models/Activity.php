<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Activity extends Model
{
    protected $fillable = ['slug', 'title', 'subject', 'category', 'description', 'adult_note', 'bncc_codes', 'sort_order'];

    protected $casts = ['bncc_codes' => 'array'];

    public function levels(): HasMany
    {
        return $this->hasMany(ActivityLevel::class)->orderBy('grade_year')->orderBy('level');
    }

    public function exercises(): HasMany
    {
        return $this->hasMany(Exercise::class)->orderBy('grade_year')->orderBy('level')->orderBy('position');
    }
}
