<?php

namespace App\Repositories;

interface BaseRepositoryInterface
{
    public function all();

    public function create(array $data);

    public function update(array $data);

    public function findById(int $id);

    public function deleteById(int $id);

    public function getModel();
}
