<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('uuid');     // id from API
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('posProductId')->nullable();
            $table->string('product_url')->nullable();
            $table->string('productCategoryName')->nullable();
            $table->string('image')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('focus_keywords')->nullable();
            $table->string('tags')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
