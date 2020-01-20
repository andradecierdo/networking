<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name')->index();
            $table->string('last_name')->index();
            $table->string('middle_name');
            $table->string('address');
            $table->string('phone_number');
            $table->string('username')->unique()->index();
            $table->string('email')->unique()->nullable();
            $table->string('password');
            $table->unsignedTinyInteger('parent_id');
            $table->enum('status', ['active', 'inactive']);
            $table->boolean('is_admin')->default(0);
            $table->double('balance')->default(0);
            $table->double('rebate')->default(0);
            $table->rememberToken();
            $table->softDeletes();
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
        Schema::dropIfExists('users');
    }
}
