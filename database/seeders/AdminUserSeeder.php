<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // Unique key to avoid duplicates
            [
                'name' => 'Admin User',
                'password' => Hash::make('password123'), // Use a strong password in production
                'type' => 'admin',
                'email_verified_at' => now(), // Mark as verified
            ]
        );
    }
}