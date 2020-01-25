<?php

namespace App\Http\Services;

use App\Models\RegistrationCode;

class CodeGeneratorService
{
    public function generateRandomCode($length, $column, $prefix = null)
    {
        $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        $randomCode = substr(str_shuffle($str_result), 0, $length);

        if (!is_null($prefix)) {
            $randomCode = $prefix . $randomCode;
        }

        if ($this->barcodeNumberExists($randomCode, $column)) {
            return $this->generateRandomCode($length, $column);
        }

        return $randomCode;
    }

    private function barcodeNumberExists($randomCode, $column) {
        return RegistrationCode::query()
            ->where($column, $randomCode)
            ->exists();
    }
}
