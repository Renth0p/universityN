<?php

namespace App\Http\Resources\Schedule;

use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
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
            'cabinet' => $this->cabinet,
            'users_id' => $this->users_id,
            'subjects_id' => $this->subjects_id,
            'date' => $this->date,
            'type' => $this->type,
            'description' => $this->description,
        ];
    }
}
