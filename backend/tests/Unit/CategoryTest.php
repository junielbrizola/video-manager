<?php

namespace Tests\Unit;

use App\Models\Category;
use PHPUnit\Framework\TestCase;

class CategoryTest extends TestCase
{
    public function testFillable()
    {
        $category = new Category();
        $categoryFillable = ['name', 'description'];
        $this->assertEquals(
            $categoryFillable,
            $category->getFillable()
        );
    }
    // public function testIfUseTraits()
    // {
    //     $traits = [
    //         SoftDeletes::class,
    //         Uuid::class
    //     ];
    //     $categoryTraits = array_keys(class_uses(Category::class));
    //     $this->assertEquals($categoryTraits, $traits);
    // }
    public function testCasts() 
    {
        $categoryCasts = [ 'id' => 'string' ];
        $category = new Category();
        $this->assertEquals(
            $categoryCasts,
            $category->getCasts()
        );
    }
    public function testIncrementing() 
    {
        $category = new Category();
        $this->assertFalse(
            $category->incrementing
        );
    }
    public function testDates() 
    {
        $dates = [ 'deleted_at', 'created_at', 'updated_at' ];
        $category = new Category();
        foreach ($dates as $date) {
            $this->assertContains($date, $category->getDates());
        }
        $this->assertCount(count($dates), $category->getDates());
    }
}
