<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'code',
        'name',
        'full_name',
        'iso3',
        'number',
        'continent_code',
        'display_order'
    ];
}
