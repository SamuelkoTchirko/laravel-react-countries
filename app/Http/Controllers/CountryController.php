<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Models\Country;
use App\Models\Continent;


use Auth;


class CountryController extends Controller
{

    //Get all resources with given filters from DB
    public function index(Request $request){

        if($request->continent != null){
            if($request->order == "a-z"){
                $countries = Country::where('continent_code', $request->continent )->orderBy('name')->paginate(10);
            }elseif($request->order == "z-a"){
                $countries = Country::where('continent_code', $request->continent )->orderBy('name', 'DESC')->paginate(10);
            }
            else{
                $countries = Country::where('continent_code', $request->continent )->paginate(10);
            }
        }else{
            if($request->order == "a-z"){
                $countries = Country::orderBy('name')->paginate(10);
            }elseif($request->order == "z-a"){
                $countries = Country::orderBy('name', 'DESC')->paginate(10);
            }
            else{
                $countries = Country::paginate(10);
            }
        }

        return response($countries, 200);

    }


    //Get one resource
    public function show($id){

        $country = DB::table('countries')
            ->join('continents', 'continents.code', '=', 'countries.continent_code')
            ->where('countries.country_id', '=', $id)
            ->select('countries.*', 'continents.name AS continent_name')
            ->get();
    
        return response($country, 200);

    }


    //Store new resource in DB
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'display_order' => ['lte:999'],
            'name' => ['required', 'max:64'],
            'full_name' => ['required', 'max:128'],
            'code' => ['required', 'unique:countries,code', 'max:2'],
            'iso3' => ['required', 'max:3'],
            'number' => ['required', 'lte:999'],
            'continent_code' => ['required', 'max:2', 'exists:continents,code'],
        ]);

        Country::create($validatedData);
        
        return response(200);
    }
}
