<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
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
            'value' => 'required|min:0',
            'type' => 'required',
        ];
    }

    public function withValidator($validator)
    {
        $type = $this->get('type');
        $value = $this->get('value');
        $isValid = true;
        $error = null;
        $column = null;
        $user = Auth::user();


        if ($type === 'encash' && $user->balance < $value) {
            $isValid = false;
            $error = 'You do not have enough balance.';
        }

        if ($type === 'rebate' && $user->rebate < $value) {
            $isValid = false;
            $error = 'You do not have enough rebate points.';
        }

        $validator->after(function ($validator) use ($isValid, $error) {
            if (!$isValid) {
                $validator->errors()->add('value', $error);
            }
        });
    }
}
