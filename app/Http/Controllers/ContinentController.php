<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Models\Country;
use App\Models\Continent;


use Auth;


class ContinentController extends Controller
{
    //Get all resources from DB
    public function index(Request $request){

        $continents = Continent::all();
        
        return response($continents, 200);

    }
}
