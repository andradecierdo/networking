<?php

namespace App\Repositories\User;

use App\Models\User;

interface UserRepositoryInterface
{
    public function setModel(User $model);

    public function loadAll();

    public function loadNonAdminWithParent();

    public function search(array $relations, array $searchData);

    public function loadAllByParentWithParent(int $parentId);

    public function loadAllByParent(int $parentId);

    public function findById(int $id);

    public function findByIdWithParent(int $id);

    public function findByIdWithParentAndRelationCount(int $id);
}
