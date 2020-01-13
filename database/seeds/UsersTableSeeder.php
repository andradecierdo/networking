<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Andrade',
            'last_name' => 'Decierdo',
            'email' => 'andradecierdo@gmail.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);

        User::create([
            'first_name' => 'Chriss',
            'last_name' => 'Sarenas',
            'email' => 'chris_azk@yahoo.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
        ]);
    }
}
