<?php

namespace App\Repositories;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Experience\ExperienceRepository;
use App\Repositories\Experience\ExperienceRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\RegistrationCode\RegistrationCodeRepository;
use App\Repositories\RegistrationCode\RegistrationCodeRepositoryInterface;
use App\Repositories\Transaction\TransactionRepositoryInterface;
use App\Repositories\Transaction\TransactionRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            BaseRepositoryInterface::class,
            BaseRepository::class
        );
        $this->app->bind(
            ExperienceRepositoryInterface::class,
            ExperienceRepository::class
        );
        $this->app->bind(
            UserRepositoryInterface::class,
            UserRepository::class
        );
        $this->app->bind(
            RegistrationCodeRepositoryInterface::class,
            RegistrationCodeRepository::class
        );
        $this->app->bind(
            TransactionRepositoryInterface::class,
            TransactionRepository::class
        );
    }
}
