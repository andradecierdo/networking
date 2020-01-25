<?php

namespace App\Repositories\User;

use App\Models\User;

interface UserRepositoryInterface
{
    public function setModel(User $model);

    public function loadAll();

    public function loadAllByParent(int $parentId);

    public function findById(int $id);
}
