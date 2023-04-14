<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     title="Meatballs API documentaion",
 *     version="1.0"
 * )
 * @OA\Server(
 *     description="Meatballs test server",
 *     url="http://127.0.0.1:8000/api/"
 * )
 * @OA\Server(
 *     description="Meatballs production server",
 *     url="https://api.meatballs.w6p.ru/api/"
 * )
 * @OA\SecurityScheme(
 *     type="apiKey",
 *     in="header",
 *     name="Authorization",
 *     securityScheme="authorization"
 * )
 */

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}
