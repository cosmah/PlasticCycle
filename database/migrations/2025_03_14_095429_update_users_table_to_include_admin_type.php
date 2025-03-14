<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Rename the existing type column temporarily
        DB::statement('ALTER TABLE users RENAME COLUMN type TO type_old');

        // Add the new type column with 'admin' included
        Schema::table('users', function (Blueprint $table) {
            $table->enum('type', ['household', 'business', 'collector', 'admin'])->default('household');
        });

        // Copy data from type_old to type (only valid values will transfer)
        DB::statement('UPDATE users SET type = type_old WHERE type_old IN ("household", "business", "collector")');

        // Drop the old column
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('type_old');
        });
    }

    public function down(): void
    {
        // Rename type to type_old
        DB::statement('ALTER TABLE users RENAME COLUMN type TO type_old');

        // Add the original type column without 'admin'
        Schema::table('users', function (Blueprint $table) {
            $table->enum('type', ['household', 'business', 'collector'])->default('household');
        });

        // Copy data back
        DB::statement('UPDATE users SET type = type_old WHERE type_old IN ("household", "business", "collector")');

        // Drop the temporary column
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('type_old');
        });
    }
};