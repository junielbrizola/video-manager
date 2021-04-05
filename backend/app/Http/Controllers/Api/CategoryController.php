<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $rules = [
        'name' => 'required|max:255'
    ];

    public function index()
    {
        //
        $categories = Category::with('videos')->get();
        return $categories;
    }

    public function store(Request $request)
    {
        //
        $this->validate($request, $this->rules);
        $category = Category::create($request->all());
        $category->videos()->attach($request->videos);
        return Category::where('id', '=', $category->id)->with('videos')->first();
    }

    public function show(Category $category)
    {
        //
        return Category::where('id', '=', $category->id)->with('videos')->first();
    }

    public function update(Request $request, Category $category)
    {
        //
        $this->validate($request, $this->rules);
        $category->update($request->all());
        foreach ($category->videos as $video) {
            $category->videos()->detach($video->id);
        }
        $category->videos()->attach($request->videos);
        return Category::where('id', '=', $category->id)->with('videos')->first();
    }

    public function destroy(Category $category)
    {
        //
        $category->delete();
        return response()->noContent();
    }
}
