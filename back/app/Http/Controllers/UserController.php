<?php

namespace App\Http\Controllers;

use App\Http\Resources\User\UserResource;
use App\Models\Subject;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    /**
     * @OA\Post(
     *     path="/register",
     *     summary="Create a new user",
     *     tags={"Users"},
     *     operationId="registerUser",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(property="first_name", type="string", example="John"),
     *                 @OA\Property(property="last_name", type="string", example="Doe"),
     *                 @OA\Property(property="email", type="string", format="email", example="johndoe@example.com"),
     *                 @OA\Property(property="record_book", type="string", example="1234567890"),
     *                 @OA\Property(property="password", type="string", example="password123"),
     *                 @OA\Property(property="password_confirmation", type="string", example="password123"),
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *             @OA\Property(property="token", type="string", example="JWT Token"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="error", type="array", @OA\Items(type="string", example="The given data was invalid.")),
     *         ),
     *     ),
     * )
     */

    public function register(Request $request): \Illuminate\Http\JsonResponse
    {

        $data = $request->validate([
            "first_name" => ["required", "string"],
            "last_name" => ["required", "string"],
            "email" => ["required", "email", "string"],
            "record_book" => ["required", "string"],
            "password" => ["required", "confirmed"],
        ]);

        $user_info = UserInfo::create([
            "record_book" => $data["record_book"]
        ]);
        $user_info->save();
        $user = User::create([
            "first_name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "email" => $data["email"],
            "password" => bcrypt($data["password"]),
            "subject_id" => Subject::query()->where('id', 1)->value('id'),
        ]);
        $user->user_info_id = UserInfo::query()->where('id', $user_info->id)->value('id');
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));
    }

    /**
     * @OA\Post(
     *     path="/login",
     *     summary="Authenticate user",
     *     operationId="authUser",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         description="JSON payload with email and password",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 required={"email", "password"},
     *                 @OA\Property(
     *                     property="email",
     *                     type="string",
     *                     format="email",
     *                     description="Email address of the user"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string",
     *                     description="Password of the user"
     *                 ),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful authentication",
     *         @OA\JsonContent(
     *             required={"success", "token"},
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 description="Status of successful authentication"
     *             ),
     *             @OA\Property(
     *                 property="token",
     *                 type="string",
     *                 description="API token of the user"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             required={"error"},
     *             @OA\Property(
     *                 property="error",
     *                 type="string",
     *                 description="Unauthorized error message"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request",
     *         @OA\JsonContent(
     *             required={"success", "errors"},
     *             @OA\Property(
     *                 property="success",
     *                 type="boolean",
     *                 description="Status of successful authentication"
     *             ),
     *             @OA\Property(
     *                 property="errors",
     *                 type="array",
     *                 description="Array of errors",
     *                 @OA\Items(
     *                     type="string"
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function login(Request $request)
    {
        // Получаем email и пароль из запроса
        $credentials = $request->only('email', 'password');

        try {
            // Проверяем email и пароль пользователя
            if (!$token = JWTAuth::attempt($credentials)) {
                // Если email или пароль неверны, возвращаем ошибку
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            // Если не удалось создать токен, возвращаем ошибку
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // Если проверка прошла успешно, возвращаем токен
        return response()->json(compact('token'));
    }
}
