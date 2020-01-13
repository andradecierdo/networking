<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::match(['put', 'patch'], '/{user}', 'UserController@update')->name('users.update');
});
