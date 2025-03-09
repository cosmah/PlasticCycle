<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('recycling_records', function (Blueprint $table) {
            $table->foreignId('recycling_center_id')->nullable()->constrained()->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('recycling_records', function (Blueprint $table) {
            $table->dropForeign(['recycling_center_id']);
            $table->dropColumn('recycling_center_id');
        });
    }
};