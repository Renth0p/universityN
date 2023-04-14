<?php

namespace App\Http\Resources\UserInfo;

use Illuminate\Http\Resources\Json\JsonResource;

class UserInfoResource extends JsonResource
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
            'faculty' => new FacultyResource($this->faculty),
            'education' => new FormOfEducationResource($this->formOfEducation),
            'group' => new GroupResource($this->group),
            'record_book' => $this->record_book
        ];
    }
}
