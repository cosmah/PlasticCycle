<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recycling_centers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->json('accepted_plastic_types');
            $table->integer('capacity'); // Max kg per day
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recycling_centers');
    }
};