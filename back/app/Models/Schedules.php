<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedules extends Model
{
    use HasFactory;

    protected $fillable = [
        'cabinet',
        'users_id',
        'subjects_id',
        'date',
        'type',
        'description',
    ];
}
