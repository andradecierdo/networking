<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:api', 'auth.admin']], function() {
    Route::post('/', 'Admin\TransactionController@store')->name('admin-transactions.store');
    Route::get('/', 'Admin\TransactionController@index')->name('admin-transactions.index');
    Route::get('/{id}', 'Admin\TransactionController@show')->name('admin-transactions.show');
    Route::delete('/{id}', 'Admin\TransactionController@delete')->name('admin-transactions.delete');
    Route::put('/{id}/update-status', 'Admin\TransactionController@updateStatus')->name('admin-transactions.update-status');
});
