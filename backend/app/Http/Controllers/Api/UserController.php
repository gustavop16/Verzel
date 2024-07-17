<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $model;

    public function __construct(User $model) {
        $this->model = $model;
    }

    public function store(StoreUserRequest $request)
    {
        $input = $request->all();
        return $this->model->create($input);
    }

    
}
