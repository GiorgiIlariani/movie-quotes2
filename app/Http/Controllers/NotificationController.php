<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NotificationController extends Controller
{
    /**
     * Return the authenticated user's recent notifications.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        return NotificationResource::collection(
            $request->user()->notifications()->latest()->limit(20)->get(),
        )->additional([
            'unread_count' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    /**
     * Mark the authenticated user's unread notifications as read.
     */
    public function markAsRead(Request $request): RedirectResponse
    {
        $request->user()->unreadNotifications->markAsRead();

        return back();
    }
}
