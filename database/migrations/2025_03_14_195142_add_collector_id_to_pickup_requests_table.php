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
        Schema::table('pickup_requests', function (Blueprint $table) {
            // Only add if the column doesn't exist already
            if (!Schema::hasColumn('pickup_requests', 'collector_id')) {
                $table->foreignId('collector_id')->nullable()->after('user_id')->constrained('users')->nullOnDelete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pickup_requests', function (Blueprint $table) {
            if (Schema::hasColumn('pickup_requests', 'collector_id')) {
                $table->dropForeign(['collector_id']);
                $table->dropColumn('collector_id');
            }
        });
    }
};