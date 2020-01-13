<?php

namespace App\Repositories\Experience;

use App\Repositories\BaseRepository;
use App\Models\Experience;

class ExperienceRepository extends BaseRepository implements ExperienceRepositoryInterface
{
    protected $model;

    /**
     * Guard Repository constructor.
     *
     * @param Experience $experience
     */
    public function __construct(Experience $experience)
    {
        parent::__construct($experience);
        $this->model = $experience;
    }

    public function loadAll($limit = 5)
    {
        return $this->model
            ->with('user')
            ->latest()
            ->paginate($limit);
    }

    public function loadAllByUser(int $userId, $limit = 5)
    {
        return $this->model
            ->with('user')
            ->latest()
            ->mine($userId)
            ->paginate($limit);
    }

    public function setModel(Experience $model)
    {
        $this->model = $model;
        return $this;
    }

    public function findByIdAndUser(int $userId, int $id)
    {
        return $this->model
            ->whereUserId($userId)
            ->whereId($id)
            ->firstOrfail();
    }
}
