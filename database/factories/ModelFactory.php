<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'password' => $password ?: $password = bcrypt('password'),
        'remember_token' => str_random(10),
    ];
});

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Models\Experience::class, function (Faker\Generator $faker) {

    return [
        'position' => $faker->jobTitle,
        'transactions' => $faker->company,
        'address' => $faker->address,
        'description' => $faker->sentence(15),
        'start_date' => \Carbon\Carbon::now()->addYear(-2),
        'end_date' => \Carbon\Carbon::now()->addMonth(-2),
    ];
});
