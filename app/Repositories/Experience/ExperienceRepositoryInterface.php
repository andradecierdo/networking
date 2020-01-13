<?php

namespace App\Repositories\Experience;

use App\Models\Experience;

interface ExperienceRepositoryInterface
{
    public function setModel(Experience $model);

    public function loadAll();

    public function loadAllByUser(int $userId);

    public function findByIdAndUser(int $userId, int $id);
}
