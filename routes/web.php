<?php

use Illuminate\Support\Facades\Route;
use App\Services\Spa;

Route::post('/jobs', [App\Http\Controllers\JobController::class, 'store']);

Route::get('/home', fn () => Spa::render('Home', ['foo' => 'bar']))
    ->name('home');

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
