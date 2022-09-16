<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Models\Country;
use App\Models\Continent;

use App\Http\Controllers\CountryController;
use App\Http\Controllers\ContinentController;

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


//Country routes
Route::get('/countries', [CountryController::class, "index"]);
Route::get('/country/{id}', [CountryController::class, "show"]);
Route::post('/country', [CountryController::class, "store"]);


//Continent routes
Route::get('/continents', [ContinentController::class, "index"]);