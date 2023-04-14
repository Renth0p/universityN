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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId')
                ->nullable();
            $table->foreign('userId')
                ->references('id')
                ->on('users');
            $table->string('topic');
            $table->string('taskTitle');
            $table->text('description');
            $table->dateTime('deadline')
                ->nullable();
            $table->string('status')
                ->default('Открыто');
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
        Schema::dropIfExists('projects');
    }
};
