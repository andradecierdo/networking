<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Transaction\TransactionRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
