<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Make flashed validation errors available to Vue --}}
    <script>
        window.__FLASH__ = {
            errors: @json($errors->getBag('default')->toArray()),
            old: @json(old()),
        }
    </script>

    @vite(['resources/js/app.js'])
</head>
<body>
<div id="app"></div>
</body>
</html>
