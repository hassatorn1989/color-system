<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\GroupColor;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        GroupColor::factory()->create([
            'name' => 'Red',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ]);
        
        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 1,
            'color' => '#FF0000',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 2,
            'color' => '#FFA07A',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 3,
            'color' => '#DC143C',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 4,
            'color' => '#B22222',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 5,
            'color' => '#8B0000',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 6,
            'color' => '#FF6347',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 7,
            'color' => '#FF4500',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 8,
            'color' => '#CD5C5C',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 9,
            'color' => '#F08080',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 10,
            'color' => '#E9967A',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 11,
            'color' => '#FA8072',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);

        Color::factory()->create([
            'group_color_id' => GroupColor::first()->id,
            'priority' => 12,
            'color' => '#FF7F50',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
            'created_by' => User::first()->name,
            'updated_by' => User::first()->name,
        ]);
    }
}
