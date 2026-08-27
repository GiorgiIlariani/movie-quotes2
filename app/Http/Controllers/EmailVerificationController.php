<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendEmailVerificationNotificationRequest;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;

class EmailVerificationController extends Controller
{
    public function verify(string $id, string $hash): JsonResponse
    {
        $user = User::find($id);

        if (! $user || ! hash_equals(sha1($user->getEmailForVerification()), $hash)) {
            abort(403);
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();

            event(new Verified($user));
        }

        return response()->json([
            'message' => 'Email verified.',
        ]);
    }

    public function send(SendEmailVerificationNotificationRequest $request): JsonResponse
    {
        $user = User::query()->where('email', $request->email)->first();

        if ($user !== null && ! $user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
        }

        return response()->json([
            'message' => 'Verification link sent.',
        ]);
    }
}
