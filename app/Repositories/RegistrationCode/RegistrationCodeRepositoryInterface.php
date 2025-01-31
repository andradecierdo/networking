<?php

namespace App\Repositories\RegistrationCode;

use App\Models\RegistrationCode;

interface RegistrationCodeRepositoryInterface
{
    public function setModel(RegistrationCode $model);

    public function findByCodes(string $passcode, string $securityCode);

    public function loadAllWithUser();

    public function loadAll();

    public function search(array $relations, array $searchData);
}
