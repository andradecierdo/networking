<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AdminUpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check() && Auth::user()->is_admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $reqUserId = $this->get('id');
        $user = Auth::user();
        $userId = $user->id;
        if ($user->is_admin && $user->id !== $reqUserId) {
            $userId = $reqUserId;
        }
        return [
            'parent_id' => 'nullable|exists:users,id',
            'first_name' => 'required|max:30',
            'last_name' => 'required|max:20',
            'middle_name' => 'required|max:20',
            'balance' => 'required|min:0|numeric',
            'rebate' => 'required|min:0|numeric',
            'address' => 'required',
            'password' => 'min:6|confirmed',
            'password_confirmation' => 'min:6',
            'phone_number' => 'required|max:20',
            'username' => [
                'required',
                'min:6',
                'max:20',
                Rule::unique('users')->ignore($userId),
            ],
            'email' => [
                'email',
                Rule::unique('users')->ignore($userId),
            ],
        ];
    }
}
