<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    //
    use SoftDeletes, Traits\Uuid;

    public $incrementing = false;

    protected $fillable = [
        'name',
        'slug'
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
