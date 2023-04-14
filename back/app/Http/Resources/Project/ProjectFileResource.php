<?php

namespace App\Http\Resources\Project;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectFileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fileName' => $this->fileName,
            'filePath' => $this->filePath === null ? $this->filePath : $this->FileUrl,
            'created' => $this->created_at
        ];
    }
}
