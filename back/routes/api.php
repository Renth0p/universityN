<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ScheduleController;
use Fruitcake\Cors\HandleCors;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Не авторизованные пользователи
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

//Авторизованные пользователи
Route::middleware("auth:api")->group(function(){

    Route::get('/schedule', [ScheduleController::class, 'schedule']);

    //Contacts function
    Route::get('/contacts/{role}', [ContactController::class, 'getContacts']);

    //Profile function
    Route::get('/profile', [ProfileController::class, 'sendUserProfileData']);
    Route::patch('/profile/change/password', [ProfileController::class, 'changeUserPassword']);
    Route::patch('/profile/change/info', [ProfileController::class, 'updateUserData']);
    Route::post('/profile/change/img', [ProfileController::class, 'changeUserAvatar']);

    //Project function
    Route::get('/projects', [ProjectController::class, 'getProjects']);
    Route::post('/projects/create', [ProjectController::class, 'createProject']);
    Route::post('/projects/update', [ProjectController::class, 'updateProjectData']);
    Route::delete('/projects/delete/{id}', [ProjectController::class, 'deleteProject']);
    Route::delete('/projects/file/delete/{id}', [ProjectController::class, 'deleteFile']);
});
