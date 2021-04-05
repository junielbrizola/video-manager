<?php

namespace Tests\Unit;

use App\Models\Tag;
use PHPUnit\Framework\TestCase;

class TagTest extends TestCase
{
    public function testFillable()
    {
        $tag = new Tag();
        $tagFillable = ['name', 'slug'];
        $this->assertEquals(
            $tagFillable,
            $tag->getFillable()
        );
    }
    // public function testIfUseTraits()
    // {
    //     $traits = [SoftDeletes::class, Uuid::class];
    //     $tagTraits = array_keys(class_uses(Tag::class));
    //     $this->assertEquals(
    //         $traits,
    //         $tagTraits
    //     );
    // }
    public function testCasts() 
    {
        $tagCasts = [ 'id' => 'string' ];
        $tag = new Tag();
        $this->assertEquals(
            $tagCasts,
            $tag->getCasts()
        );
    }
    public function testIncrementing() 
    {
        $tag = new Tag();
        $this->assertFalse(
            $tag->incrementing
        );
    }
    public function testDates() 
    {
        $dates = [ 'deleted_at', 'created_at', 'updated_at' ];
        $tag = new Tag();
        foreach ($dates as $date) {
            $this->assertContains($date, $tag->getDates());
        }
        $this->assertCount(count($dates), $tag->getDates());
    }
}
