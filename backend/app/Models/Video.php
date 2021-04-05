<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    //
    use SoftDeletes, Traits\Uuid;

    public $incrementing = false;

    protected $fillable = [
        'name',
        'description',
        'is_active',
    ];
    protected $dates = [ 
        'deleted_at' 
    ];
    protected $casts = [
        'id' => 'string'
    ];

    public function categories() {
        return $this->belongsToMany(Category::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

}

