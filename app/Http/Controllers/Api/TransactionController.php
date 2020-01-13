<?php

namespace App\Http\Controllers;

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
    {c

    }

    public function store()
    {

    }

    public function delete()
    {

    }
}
