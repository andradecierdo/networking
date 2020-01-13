<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class ExperiencesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::first();
        factory(App\Models\Experience::class, 1)->create([
            'user_id' => $user->id
        ]);
    }
}
