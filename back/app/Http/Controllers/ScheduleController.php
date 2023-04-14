<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\Schedule\ScheduleResource;
use Illuminate\Http\Request;
use App\Models\Schedules;

class ScheduleController extends Controller
{
    /**
     * @OA\Get(
     *     path="/schedule",
     *     operationId="scheduleUser",
     *     tags={"Schedule"},
     *     summary="Take schedule list",
     *     @OA\Response(
     *          response="200",
     *          description="Successful operation",
     *          @OA\MediaType(
     *              mediaType="application/json",
     *              @OA\Schema(
     *                  @OA\Property(type="boolean", property="success", example="true"),
     *              ),
     *          ),
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

    public function schedule()
    {
        $data = Schedules::all();

        return ScheduleResource::collection($data);
    }
}
