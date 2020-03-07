<?php

namespace App\Repositories\Transaction;

use App\Models\Transaction;

interface TransactionRepositoryInterface
{
    public function setModel(Transaction $model);

    public function loadAll();

    public function loadAllByUser(int $userId);

    public function search(array $relations, array $searchData);

    public function findByIdAndUser(int $userId, int $id);

    public function findByIdWithUser(int $id);

    public function updateStatus(string $status);

    public function updateStatusByIdAndsUser(int $id, int $userId, string $status);
}
