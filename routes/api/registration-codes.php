<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/', 'RegistrationCodeController@store')->name('registration-codes.store');
    Route::get('/', 'RegistrationCodeController@index')->name('registration-codes.index');
    Route::delete('/{id}', 'RegistrationCodeController@delete')->name('registration-codes.delete');
});
