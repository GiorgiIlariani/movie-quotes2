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
        Schema::create('category_movie', function (Blueprint $table) {
            $table->foreignId('movie_id')
                ->index()
                ->constrained('movies')
                ->cascadeOnDelete();
            $table->foreignId('category_id')
                ->index()
                ->constrained('categories')
                ->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['movie_id', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_movie');
    }
};
