<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormOfEducation extends Model
{
    use HasFactory;

    protected $fillable = [
        'education_name'
    ];

    public function userInfos(): HasMany
    {
        return $this->hasMany(UserInfo::class);
    }
}
