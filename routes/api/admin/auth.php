<?php

use Illuminate\Support\Facades\Route;

Route::post('login', 'Admin\LoginController@login')->name('admin-auth.login');
