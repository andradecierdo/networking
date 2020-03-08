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

    public function search(array $relations, array $searchData, $limit = 20)
    {
        $parentId = $searchData['parentId'];
        $keyword = $searchData['keyword'];
        $exceptions = $searchData['exceptions'];
        $order = $searchData['order'];
        $orderBy = $searchData['orderBy'];
        $query = $this->model->newQuery();

        if (!is_null($parentId)) {
            $query->whereParentId($parentId);
        }

        if (count($relations)) {
            $query->with($relations);
        }

        if (count($exceptions)) {
            $query->whereNotIn('id', $exceptions);
        }

        if ($orderBy && $order) {
            $query->orderBy($orderBy, $order);
        }

        if ($keyword) {
            $query->where(function ($query) use ($keyword) {
                $query->where('first_name', 'like', "%{$keyword}%")
                    ->orWhere('username', 'like', "%{$keyword}%")
                    ->orWhere('last_name', 'like', "%{$keyword}%")
                    ->orWhere('status', 'like', "%{$keyword}%");
            });
        }

        return $query->paginate($limit);
    }

    public function loadNonAdminWithParent($limit = 20)
    {
        return $this->model
            ->isNotAdmin()
            ->with('parent')
            ->latest()
            ->paginate($limit);
    }

    public function findByIdWithParentAndRelationCount(int $id)
    {
        return $this->model
            ->with('parent')
            ->withCount('transactions')
            ->withCount('downlines')
            ->findOrFail($id);
    }
}
