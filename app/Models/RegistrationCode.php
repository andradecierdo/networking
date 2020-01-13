<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RegistrationCode extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'passcode',
        'security_code',
    ];
}
