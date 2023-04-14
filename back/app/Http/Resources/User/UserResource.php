<?php

namespace App\Http\Resources\User;

use App\Http\Resources\UserInfo\UserInfoResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'middle_name' => $this->middle_name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'img' => $this->img === null ? $this->img : $this->imageUrl,
            'post' => new PostResource($this->post),
            'subject' => new SubjectResource($this->subject),
            'info' => new UserInfoResource($this->userInfo)
        ];
    }
}
