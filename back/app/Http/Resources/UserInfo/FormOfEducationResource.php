<?php

namespace App\Http\Resources\UserInfo;

use Illuminate\Http\Resources\Json\JsonResource;

class FormOfEducationResource extends JsonResource
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
            $this->education_name
        ];
    }
}
