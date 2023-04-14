<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'projectId',
        'fileName',
        'filePath'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'projectId');
    }

    public function getFileUrlAttribute()
    {
        return url('storage' . $this->filePath);
    }
}
