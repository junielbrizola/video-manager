<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    
    private $rules = [
        'name' => 'required|max:255',
        'is_active' => 'boolean',
        'categories' => 'required'
    ];

    public function index()
    {
        $videos = Video::with(['categories', 'tags'])->get();
        return $videos;
    }

    public function store(Request $request)
    {
        //
        $this->validate($request, $this->rules);
        $video = Video::create($request->all());
        $video->categories()->attach($request->categories);
        $video->tags()->attach($request->tags);
        return Video::where('id', '=', $video->id)->with(['categories', 'tags'])->first();
    }

    public function show(Video $video)
    {
        //
        return Video::where('id', '=', $video->id)->with(['categories', 'tags'])->first();
    }

    public function update(Request $request, Video $video)
    {
        //
        $this->validate($request, $this->rules);
        $video->update($request->all());
        foreach ($video->categories as $category) {
            $video->categories()->detach($category->id);
        }
        $video->categories()->attach($request->categories);
        foreach ($video->tags as $tag) {
            $video->tags()->detach($tag->id);
        }
        $video->tags()->attach($request->tags);
        return Video::where('id', '=', $video->id)->with(['categories', 'tags'])->first();
    }

    public function destroy(Video $video)
    {
        //
        $video->delete();
        return response()->noContent();
    }
}
