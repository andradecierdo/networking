<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api', 'auth.admin']], function() {
    Route::post('/', 'Admin\TransactionController@store')->name('transactions.store');
    Route::get('/', 'Admin\TransactionController@index')->name('transactions.index');
    Route::delete('/{id}', 'Admin\TransactionController@delete')->name('transactions.delete');
});
