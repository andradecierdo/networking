<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'address',
        'phone_number',
        'username',
        'email',
        'password',
        'parent_id',
        'status',
        'is_admin',
        'balance',
        'rebate',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_admin' => 'boolean',
    ];

//    /**
//     * The relation between user and experiences
//     *
//     * @return \Illuminate\Database\Eloquent\Relations\HasMany
//     */
//    public function experiences(): HasMany
//    {
//        return $this->hasMany(Experience::class);
//    }

    /**
     * The relation between user and downlines
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function downlines(): HasMany
    {
        return $this->hasMany(User::class, 'parent_id', 'id');
    }

    /**
     * The relation between a user and it's parent
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id', 'id');
    }

    /**
     * Find the user instance for the given username.
     *
     * @param  string  $username
     * @return \App\Models\User
     */
    public function findForPassport($username)
    {
        return $this->where('username', $username)->first();
    }
}
