<?php

namespace App\Http\Resources;

use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Quote
 */
class QuoteResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quote' => $this->getTranslations('quote'),
            'cover' => $this->getFirstMediaUrl('quote_cover') ?: null,
            'movie_id' => $this->movie_id,
            'user_id' => $this->user_id,
            'movie' => $this->whenLoaded('movie', fn () => new MovieOptionResource($this->movie)),
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ]),
            'likes_count' => $this->whenCounted('likes'),
            'comments_count' => $this->whenCounted('comments'),
            'liked' => $this->when(isset($this->liked), fn () => (bool) $this->liked),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
