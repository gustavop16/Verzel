<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Testing\Concerns\MakesHttpRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function login(Request $request){
        if(!Auth::attempt($request->only('email','password'))){
            return response(['message' => 'Not Authorized'],401);
        }
        $token = $request->user()->createToken('auth')->plainTextToken;
        return response([
            'message' => 'Authorized',
            'token' => $token,
            'name' => Auth::User()->name,
        ],
        200,);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response(['message' => 'Logout'],200,);
    }
}
