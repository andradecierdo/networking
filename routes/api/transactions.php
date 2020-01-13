<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/', 'TransactionController@store')->name('transactions.store');
    Route::get('/', 'TransactionController@index')->name('transactions.index');
    Route::delete('/{id}', 'TransactionController@delete')->name('transactions.delete');
});
