<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProfileController extends Controller
{
    /**
     * @OA\Get(
     *     path="/profile",
     *     security={{"bearerAuth":{}}},
     *     operationId="getUser",
     *     tags={"Profile"},
     *     summary="Get user profile",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(type="integer", property="id"),
     *                 @OA\Property(type="string", property="first_name"),
     *                 @OA\Property(type="string", property="last_name"),
     *                 @OA\Property(type="string", property="middle_name"),
     *                 @OA\Property(type="string", property="email"),
     *                 @OA\Property(type="string", property="phone_number"),
     *                 @OA\Property(type="string", property="img"),
     *                 @OA\Property(
     *                     type="object",
     *                     property="post",
     *                     @OA\Property(type="string", property="post")
     *                 ),
     *                 @OA\Property(
     *                     type="object",
     *                     property="subject",
     *                     @OA\Property(type="string", property="subject")
     *                 ),
     *                 @OA\Property(
     *                     type="object",
     *                     property="info",
     *                     @OA\Property(
     *                         type="array",
     *                         property="faculty",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(
     *                         type="array",
     *                         property="education",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(
     *                         type="array",
     *                         property="group",
     *                         @OA\Items(type="string")
     *                     ),
     *                     @OA\Property(type="string", property="record_book")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(type="boolean", property="success", example=false),
     *             @OA\Property(type="string", property="error", example="Unauthorized")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *         @OA\JsonContent(
     *             @OA\Property(type="boolean", property="success", example=false),
     *             @OA\Property(type="string", property="error", example="User not found")
     *         )
     *     )
     * )
     */
    public function sendUserProfileData()
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();
        return new UserResource($user);
    }

    /**
     * @OA\Patch(
     *     path="/profile/change/password",
     *     summary="Change user password",
     *     description="Changes the password of the authenticated user.",
     *     operationId="changePassword",
     *     tags={"Profile"},
     *     security={{ "bearerAuth": {} }},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="old_password",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="new_password",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Password changed successfully.",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Password changed successfully."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Invalid credentials.",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Invalid credentials."
     *             )
     *         )
     *     )
     * )
     */
    public function changeUserPassword(Request $request)
    {
        $request->validate([
            'old_password' => ["required"],
            "new_password" => ["required"]
        ]);

        $token = JWTAuth::parseToken();
        $user = $token->authenticate();
        if (!$user) {
            return response()->json([
                'message' => 'User not found.'
            ], 404);
        }

        if (Hash::check($request['old_password'], $user->password)) {
            $user->password = bcrypt($request['new_password']);
            $user->save();
            return response()->json([
                'message' => 'Password changed successfully.'
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }
    }

    /**
     * @OA\Patch(
     *     path="/profile/change/info",
     *     summary="Updates user profile data",
     *     tags={"Profile"},
     *     operationId="changeInfo",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/x-www-form-urlencoded",
     *             @OA\Schema(
     *                 type="object",
     *                 @OA\Property(
     *                     property="first_name",
     *                     description="User's first name",
     *                     type="string",
     *                     example="John"
     *                 ),
     *                 @OA\Property(
     *                     property="last_name",
     *                     description="User's last name",
     *                     type="string",
     *                     example="Doe"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     description="User's email address",
     *                     type="string",
     *                     example="johndoe@example.com"
     *                 ),
     *                 @OA\Property(
     *                     property="phone_number",
     *                     description="User's phone number",
     *                     type="string",
     *                     example="+1 (555) 123-4567"
     *                 ),
     *                 @OA\Property(
     *                     property="middle_name",
     *                     description="User's middle name",
     *                     type="string",
     *                     example="Michael"
     *                 ),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User profile data updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Данные успешно обновлены"
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Failed to update user profile data",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Ошибка"
     *             ),
     *         ),
     *     ),
     * )
     */
    public function updateUserData(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        if ($user) {
            $request['first_name'] === null ?  : $user->first_name = $request['first_name'];
            $request['last_name'] === null ?  : $user->last_name = $request['last_name'];
            $request['email'] === null ?  : $user->email = $request['email'];
            $request['phone_number'] === null ?  : $user->phone_number = $request['phone_number'];
            $request['middle_name'] === null ?  : $user->middle_name = $request['middle_name'];
            $user->save();
            return response()->json([
                'message' => 'Данные успешно обновлены',
                $user->first_name
            ], 200);
        }

        return response()->json([
            'message' => 'Ошибка'
        ], 400);
    }

    /**
     * @OA\Post(
     *     path="/profile/change/img",
     *     tags={"Profile"},
     *     operationId="changeImg",
     *     summary="Update user avatar",
     *     description="Update the user's profile picture.",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="New user avatar file",
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="img",
     *                     description="New user avatar file",
     *                     type="string",
     *                     format="binary"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 description="Success message"
     *             ),
     *             @OA\Property(
     *                 property="img",
     *                 type="string",
     *                 description="URL of the updated user avatar"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="400",
     *         description="Invalid request parameters",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 description="Error message"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 description="Error message"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="422",
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 description="Error message"
     *             )
     *         )
     *     )
     * )
     */
    public function changeUserAvatar(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        // Валидируем файл аватарки
        $validated = $request->validate([
            'img' => ['required', 'image', 'max:2048'],
        ]);

        // Обрабатываем файл аватарки
        $img = $request->file('img');
        $filename = time() . '.' . $img->getClientOriginalExtension();
        $img->storeAs('userImg/uid' . $user->id, $filename, 'public');

        // Удаляем старый файл аватарки, если он был
        if ($user->img) {
            Storage::disk('public')->delete('userImg/uid' . $user->id . '/' . $user->img);
        }

        // Сохраняем имя файла аватарки в модели пользователя
        $user->img = '/userImg/uid' . $user->id . '/' . $filename;
        $user->save();

        // Возвращаем ответ с обновленным объектом пользователя
        return response()->json([
            'message' => 'Фото профиля успешно обновлено',
            'img' => $user->imageUrl
        ]);
    }
}
