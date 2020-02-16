<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api', 'auth.admin']], function() {
    Route::match(['put', 'patch'], '/{user}', 'Admin\UserController@update')->name('admin-users.update');
    Route::post('/', 'Admin\UserController@store')->name('admin-users.store');
    Route::get('/', 'Admin\UserController@index')->name('admin-users.index');
    Route::get('/{id}', 'Admin\UserController@show')->name('admin-users.show');
    Route::delete('/{id}', 'Admin\UserController@delete')->name('admin-users.delete');
});
