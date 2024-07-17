<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');   
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});

Route::prefix('user')->controller(UserController::class)->group(function () {
    Route::post('/create', 'store');   
});

Route::middleware('auth:sanctum')->prefix('car')->controller(CarController::class)->group(function () {
    Route::post('/create', 'store');   
    Route::get('/', 'all');   
    Route::get('/{car}', 'show');
    Route::put('/edit/{car}', 'update');
    Route::delete('/delete/{car}', 'destroy');   
});


/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/
