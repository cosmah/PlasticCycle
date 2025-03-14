<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('recycling_records', function (Blueprint $table) {
            $table->unsignedBigInteger('collector_id')->nullable()->after('recycling_center_id');

            // Add foreign key constraint if needed
            $table->foreign('collector_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recycling_records', function (Blueprint $table) {
            $table->dropForeign(['collector_id']);
            $table->dropColumn('collector_id');
        });
    }
};
