<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'first_name' => 'required|max:30',
            'last_name' => 'required|max:20',
            'middle_name' => 'required|max:20',
            'address' => 'required',
            'phone_number' => 'required|max:20',
            'username' => [
                'required',
                'min:6',
                'max:20',
                Rule::unique('users')->ignore(Auth::user()->id),
            ],
            'email' => [
                'email',
                Rule::unique('users')->ignore(Auth::user()->id),
            ],
        ];
    }
}
