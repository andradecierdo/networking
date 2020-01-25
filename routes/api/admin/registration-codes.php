<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api', 'auth.admin']], function() {
    Route::post('/', 'Admin\RegistrationCodeController@store')->name('registration-codes.store');
    Route::get('/', 'Admin\RegistrationCodeController@index')->name('registration-codes.index');
    Route::delete('/{id}', 'Admin\RegistrationCodeController@delete')->name('registration-codes.delete');
    Route::get('/generate/', 'Admin\RegistrationCodeController@generateCode')->name('registration-codes.generate');
});
