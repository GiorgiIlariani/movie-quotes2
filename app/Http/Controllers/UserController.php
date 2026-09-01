<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = User::create($request->only(['name', 'email', 'password']));

        event(new Registered($user));

        return response()->json([
            'message' => 'User created successful!',
        ]);
    }
}
