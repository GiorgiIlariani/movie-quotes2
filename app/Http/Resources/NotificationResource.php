<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Arr;

/**
 * @mixin DatabaseNotification
 */
class NotificationResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'kind' => Arr::get($this->data, 'kind', 'like'),
            'actor_name' => Arr::get($this->data, 'actor_name', ''),
            'quote_id' => (int) Arr::get($this->data, 'quote_id'),
            'quote_cover' => Arr::get($this->data, 'quote_cover'),
            'read_at' => $this->read_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
