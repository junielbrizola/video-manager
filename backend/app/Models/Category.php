<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    //
    use SoftDeletes, Traits\Uuid;

    public $incrementing = false;

    protected $fillable = [
        'name',
        'description'
    ];
    protected $dates = [ 
        'deleted_at' 
    ];
    protected $casts = [
        'id' => 'string'
    ];
    
    public function videos() {
        return $this->belongsToMany(Video::class);
    }

}

