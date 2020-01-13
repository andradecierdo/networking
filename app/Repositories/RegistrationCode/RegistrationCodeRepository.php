<?php

namespace App\Repositories\RegistrationCode;

use App\Repositories\BaseRepository;
use App\Models\RegistrationCode;

class RegistrationCodeRepository extends BaseRepository implements RegistrationCodeRepositoryInterface
{
    protected $model;

    /**
     * Guard Repository constructor.
     *
     * @param RegistrationCode $user
     */
    public function __construct(RegistrationCode $user)
    {
        parent::__construct($user);
        $this->model = $user;
    }

    public function setModel(RegistrationCode $model)
    {
        $this->model = $model;
        return $this;
    }
}
