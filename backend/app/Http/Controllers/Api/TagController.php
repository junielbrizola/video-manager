<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
    private $rules = [
        'name' => 'required|max:255',
    ];

    private function generateSlug($name) {
        return Str::slug($name);
    } 

    public function index()
    {
        //
        $tags = Tag::with('videos')->get();
        return $tags;
    }

    public function store(Request $request)
    {
        //
        $this->validate($request, $this->rules);
        $request['slug'] = $this->generateSlug($request->name);
        $tag = Tag::create($request->all());
        $tag->videos()->attach($request->videos);
        return Tag::where('id', '=', $tag->id)->with('videos')->first();
    }

    public function show(Tag $tag)
    {
        //
        return Tag::where('id', '=', $tag->id)->with('videos')->first();
    }

    public function update(Request $request, Tag $tag)
    {
        //
        $this->validate($request, $this->rules);
        $request['slug'] = $this->generateSlug($request->name);
        $tag->update($request->all());
        foreach ($tag->videos as $video) {
            $tag->videos()->detach($video->id);
        }
        $tag->videos()->attach($request->videos);
        return Tag::where('id', '=', $tag->id)->with('videos')->first();
    }

    public function destroy(Tag $tag)
    {
        //
        $tag->delete();
        return response()->noContent();
    }
}
