<?php

namespace App\Repositories\Transaction;

use App\Repositories\BaseRepository;
use App\Models\Transaction;

class TransactionRepository extends BaseRepository implements TransactionRepositoryInterface
{
    protected $model;

    /**
     * Guard Repository constructor.
     *
     * @param Transaction $transaction
     */
    public function __construct(Transaction $transaction)
    {
        parent::__construct($transaction);
        $this->model = $transaction;
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

    public function setModel(Transaction $model)
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

    public function findByIdWithUser(int $id)
    {
        return $this->model
            ->with(['user', 'approver'])
            ->findOrFail($id);
    }

    public function updateStatus(string $status)
    {
         $this->model->update(['status' => $status]);
         return $this->model;
    }

    public function updateStatusByIdAndsUser(int $id, int $userId, string $status)
    {
        $this->model->whereUserId($userId)
            ->whereId($id)
            ->firstOrfail()
            ->update(['status' => $status]);

        return $this->model;
    }
}
