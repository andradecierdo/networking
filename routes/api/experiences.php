<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/', 'ExperienceController@store')->name('experiences.store');
    Route::get('/', 'ExperienceController@index')->name('experiences.index');
    Route::get('/{id}', 'ExperienceController@show')->name('experiences.show');
    Route::match(['put', 'patch'], '/{id}', 'ExperienceController@update')->name('experiences.update');
    Route::delete('/{id}', 'ExperienceController@delete')->name('experiences.delete');
});
