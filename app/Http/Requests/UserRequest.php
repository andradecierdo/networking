<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Models\RegistrationCode;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'passcode' => 'required',
            'security_code' => 'required',
            'first_name' => 'required|max:30',
            'last_name' => 'required|max:20',
            'middle_name' => 'required|max:20',
            'address' => 'required',
            'phone_number' => 'required|max:20',
            'username' => 'required|min:6|max:20|unique:users',
            'email' =>  'unique:users',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6',
            'parent_id' => 'nullable|exists:users,id',
        ];
    }

    public function withValidator($validator)
    {
        $passcode = $this->get('passcode');
        $securityCode = $this->get('security_code');

        $isValid = RegistrationCode::query()
            ->wherePasscode($passcode)
            ->whereSecurityCode($securityCode)
            ->whereNull('user_id')
            ->exists();

        $validator->after(function ($validator) use ($isValid) {
            if (!$isValid) {
                $validator->errors()->add('passcode', 'Invalid passcode!');
                $validator->errors()->add('security_code', 'Invalid security_code!');
            }
        });
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'password.confirmed' => 'The password does not match.'
        ];
    }
}
