<?php

namespace App\Repositories;

use Exception;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected $model;

    /**
     * Guard Repository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    /**
     * Get all data.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Create model.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Find model by id.
     *
     * @param int $id
     * @return Model
     */
    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Delete model by id.
     *
     * @param int $id
     * @return bool|integer 1 or 0
     * @throws Exception
     */
    public function deleteById(int $id)
    {
        return $this->findById($id)->delete();
    }

    public function update(array $data)
    {
        $this->model->update($data);
        return $this->model;
    }

    public function getModel()
    {
        return $this->model;
    }
}
