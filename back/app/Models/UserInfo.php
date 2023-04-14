<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'faculty_id',
        'form_of_education_id',
        'group_id',
        'record_book'
    ];

    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    public function formOfEducation(): BelongsTo
    {
        return $this->belongsTo(FormOfEducation::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
