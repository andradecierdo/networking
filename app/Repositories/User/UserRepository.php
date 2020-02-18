<?php

namespace App\Repositories\User;

use App\Repositories\BaseRepository;
use App\Models\User;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    protected $model;

    /**
     * Guard Repository constructor.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        parent::__construct($user);
        $this->model = $user;
    }

    public function setModel(User $model)
    {
        $this->model = $model;
        return $this;
    }

    public function loadAllByParent(int $parentId, $limit = 20)
    {
        return $this->model
            ->parentId($parentId)
            ->latest()
            ->paginate($limit);
    }

    public function loadAll($limit = 10)
    {
        return $this->model
            ->latest()
            ->paginate($limit);
    }

    public function loadAllByParentWithParent(int $parentId, $limit = 20)
    {
        return $this->model
            ->parentId($parentId)
            ->with('parent')
            ->latest()
            ->paginate($limit);
    }

    public function findByIdWithParent(int $id)
    {
        return $this->model
            ->with('parent')
            ->whereId($id)
            ->firstOrfail();
    }
}
