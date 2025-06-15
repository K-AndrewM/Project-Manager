<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Project;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Andrew',
            'email' => 'a@mail.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => time(),
        ]);

        Project::factory()->count(30)->hasTasks(30)->create();
    }
}
