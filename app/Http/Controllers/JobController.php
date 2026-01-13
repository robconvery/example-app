<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobUpdateRequest;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function store(JobUpdateRequest $request)
    {

        return redirect()->back()->with('status', 'Job created successfully!');
    }

}
