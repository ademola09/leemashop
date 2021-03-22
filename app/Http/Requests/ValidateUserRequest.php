<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:3',
            'username' => 'required|min:3|string|max:255|unique:users,username,' . $this->user->id,
            'role' => 'required|integer',
            'email' => 'required|string|email|max:255|unique:users,email,'. $this->user->id,
            'password' => 'string',
        ];
    }
}
