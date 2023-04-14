<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ContactController extends Controller
{
    /**
     * @OA\Get(
     *     path="/contacts/{role}",
     *     summary="Get contact list by role",
     *     description="Retrieve a list of contacts by role",
     *     operationId="getContactsByRole",
     *     tags={"Contacts"},
     *     @OA\Parameter(
     *         name="role",
     *         in="path",
     *         description="Role of contact to retrieve",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Success",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(type="integer", property="id", example=4),
     *                     @OA\Property(type="string", property="first_name", example="Студент"),
     *                     @OA\Property(type="string", property="last_name", example="Студентов"),
     *                     @OA\Property(type="string", property="middle_name", example="Студентович"),
     *                     @OA\Property(type="string", property="email", example="student@university.com"),
     *                     @OA\Property(type="string", property="phone_number", example="123-456-7890"),
     *                     @OA\Property(type="string", property="img", example=null),
     *                     @OA\Property(
     *                         type="object",
     *                         property="post",
     *                         @OA\Property(type="string", property="post", example="Староста")
     *                     ),
     *                     @OA\Property(
     *                         type="object",
     *                         property="subject",
     *                         @OA\Property(type="string", property="subject", example="Технологии полиграфии")
     *                     ),
     *                     @OA\Property(
     *                         type="object",
     *                         property="info",
     *                         @OA\Property(
     *                             type="array",
     *                             property="faculty",
     *                             @OA\Items(type="string", example="Информационная безопасность")
     *                         ),
     *                         @OA\Property(
     *                             type="array",
     *                             property="education",
     *                             @OA\Items(type="string", example="Очная")
     *                         ),
     *                         @OA\Property(
     *                             type="array",
     *                             property="group",
     *                             @OA\Items(type="string", example="ИБА-41")
     *                         ),
     *                         @OA\Property(type="string", property="record_book", example="1")
     *                     )
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *          response="400",
     *          description="Bad Request",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(type="boolean", property="success", example="false"),
     *          ),
     *     ),
     * )
     */

    public function getContacts($role): AnonymousResourceCollection
    {
        return UserResource::collection(User::where(['role' => $role])->paginate(10));
    }
}
