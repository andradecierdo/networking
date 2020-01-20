<?php

use Illuminate\Support\Facades\Route;

Route::post('login', 'Auth\LoginController@login')->name('auth.login');

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('register', 'Auth\RegisterController@register')->name('auth.register');
    Route::delete('/logout', 'Auth\LoginController@logout')->name('auth.logout');;
    Route::get('/user', 'Auth\LoginController@getUser')->name('auth.user.get');;
});
