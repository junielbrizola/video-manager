<?php

namespace Tests\Unit;

use App\Models\Video;
use PHPUnit\Framework\TestCase;

class VideoTest extends TestCase
{
    public function testFillable()
    {
        $video = new Video();
        $videoFillable = ['name', 'description', 'is_active'];
        $this->assertEquals(
            $videoFillable,
            $video->getFillable()
        );
    }
    // public function testIfUseTraits()
    // {
    //     $traits = [SoftDeletes::class, Uuid::class];
    //     $videoTraits = array_keys(class_uses(Video::class));
    //     $this->assertEquals(
    //         $traits,
    //         $videoTraits
    //     );
    // }
    public function testCasts() 
    {
        $videoCasts = [ 'id' => 'string' ];
        $video = new Video();
        $this->assertEquals(
            $videoCasts,
            $video->getCasts()
        );
    }
    public function testIncrementing() 
    {
        $video = new Video();
        $this->assertFalse(
            $video->incrementing
        );
    }
    public function testDates() 
    {
        $dates = [ 'deleted_at', 'created_at', 'updated_at' ];
        $video = new Video();
        foreach ($dates as $date) {
            $this->assertContains($date, $video->getDates());
        }
        $this->assertCount(count($dates), $video->getDates());
    }
}

