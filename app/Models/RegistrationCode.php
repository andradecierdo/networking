<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RegistrationCode extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'status',
        'passcode',
        'security_code',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
