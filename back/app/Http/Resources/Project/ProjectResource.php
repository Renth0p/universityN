<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\User\SubjectResource;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $files = [];

        foreach ($this->files as $file) {
            $files[] = new ProjectFileResource($file);
        }

        return [
            'id' => $this->id,
            'taskTitle' => $this->taskTitle,
            'description' => $this->description,
            'deadline' => $this->deadline,
            'status' => $this->status,
            'topic' => $this->topic,
            'subject' => new SubjectResource($this->user->subject),
            'files' => $files,
            'created' => $this->created_at
        ];
    }
}
