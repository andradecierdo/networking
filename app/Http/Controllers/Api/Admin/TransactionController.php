<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Transaction\TransactionRepositoryInterface;

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

    public function delete()
    {

    }

    public function show($id)
    {
        return $this->transactionRepository->findByIdWithUser($id);
    }
}
