<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Transaction\TransactionRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    protected $transactionRepository;

    /**
     * Initialize the repository used by the controller.
     * The repository handles database processes
     *
     * RegisterController constructor.
     * @param TransactionRepositoryInterface $transactionRepository
     */
    public function __construct(TransactionRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    /**
     * Search a listing of the resource.
     *
     * @param Request $request
     * @return LengthAwarePaginator|mixed
     */
    public function search(Request $request)
    {
        $relations = $request->relations ?? [];
        $searchData['userId'] = $request->userId ?? null;
        $searchData['keyword'] = $request->keyword ?? null;
        $searchData['order'] = $request->order ?? null;
        $searchData['orderBy'] = $request->orderBy ?? null;

        return $this->transactionRepository->search($relations, $searchData);
    }

    public function index(Request $request)
    {
        return $this->transactionRepository->loadAll();
    }

    public function store()
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $this->transactionRepository->deleteById($id);

        return response(['success' => true], 200);
    }

    public function show($id)
    {
        return $this->transactionRepository->findByIdWithUser($id);
    }

    public function updateStatus(Request $request, $id)
    {
        $status = $request->get('status');
        $userId = $request->get('user_id');
        $this->transactionRepository->updateStatusByIdAndsUser($id, $userId, $status);

        return response(['success' => true], 200);
    }
}
