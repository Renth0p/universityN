<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Faculty extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_name'
    ];

    public function userInfos(): HasMany
    {
        return $this->hasMany(UserInfo::class);
    }
}
