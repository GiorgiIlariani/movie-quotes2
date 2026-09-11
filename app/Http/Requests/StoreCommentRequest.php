<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'comment' => ['required', 'string', 'max:1000'],
        ];
    }

    public function comment(): string
    {
        /** @var string $comment */
        $comment = $this->validated('comment');

        return $comment;
    }
}
