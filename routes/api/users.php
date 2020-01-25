<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::match(['put', 'patch'], '/{user}', 'UserController@update')->name('users.update');
    Route::post('/', 'UserController@store')->name('users.store');
    Route::get('/', 'UserController@index')->name('users.index');
    Route::get('/{id}', 'UserController@show')->name('users.show');
    Route::delete('/{id}', 'UserController@delete')->name('users.delete');
});
