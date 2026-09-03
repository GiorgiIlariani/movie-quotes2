<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SessionStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nameOrEmail' => ['required', 'string', 'min:3'],
            'password' => ['required', 'string'],
            'remember_me' => ['boolean'],
        ];
    }

    /**
     * @return array{email?: string, name?: string, password: string}
     */
    public function credentials(): array
    {
        $login = $this->validated('nameOrEmail');

        return [
            (filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'name') => $login,
            'password' => $this->validated('password'),
        ];
    }
}
