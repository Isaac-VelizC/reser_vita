<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;

class ApiController extends Controller
{

    public function listService()
    {
        $services = Service::all();
        return response()->json([
            'services' => ServiceResource::collection($services),
            'success' => true
        ]);
    }
}
