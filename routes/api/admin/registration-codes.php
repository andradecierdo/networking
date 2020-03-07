<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api', 'auth.admin']], function() {
    Route::post('/', 'Admin\RegistrationCodeController@store')->name('admin-registration-codes.store');
    Route::get('/', 'Admin\RegistrationCodeController@index')->name('admin-registration-codes.index');
    Route::get('/search', 'Admin\RegistrationCodeController@search')->name('admin-search-registration-codes.index');
    Route::delete('/{id}', 'Admin\RegistrationCodeController@delete')->name('admin-registration-codes.delete');
    Route::get('/generate/', 'Admin\RegistrationCodeController@generateCode')->name('admin-registration-codes.generate');
});
