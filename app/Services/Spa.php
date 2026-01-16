<?php

namespace App\Services;

use Illuminate\Support\Facades\View;

class Spa
{
    public static function render(string $component, array $props = [])
    {
        return View::make('app', [
            'page' => [
                'component' => $component,
                'props' => $props,
                'url' => request()->getRequestUri(),
            ]
        ]);
    }
}
