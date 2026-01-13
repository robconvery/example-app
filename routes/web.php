<?php

use Illuminate\Support\Facades\Route;

Route::post('/jobs', [App\Http\Controllers\JobController::class, 'store']);

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
