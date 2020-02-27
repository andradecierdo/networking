<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransactionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Transaction\TransactionRepositoryInterface;
use App\Http\Services\TransactionService;
use Illuminate\Support\Facades\DB;
use Exception;

class TransactionController extends Controller
{
    protected $userRepository;
    protected $transactionRepository;
    protected $transactionService;

    /**
     * Initialize the repository used by the controller.
     * The repository handles database processes
     *
     * RegisterController constructor.
     * @param UserRepositoryInterface $userRepository
     * @param TransactionRepositoryInterface $transactionRepository
     * @param TransactionService $transactionService
     */
    public function __construct(
        UserRepositoryInterface $userRepository,
        TransactionRepositoryInterface $transactionRepository,
        TransactionService $transactionService
    ) {
        $this->userRepository = $userRepository;
        $this->transactionRepository = $transactionRepository;
        $this->transactionService = $transactionService;
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        return $this->transactionRepository->loadAllByUser($user->id);
    }

    public function store(TransactionRequest $request)
    {
        $data = $request->validated();
        $user = Auth::user();
        $value = (float)$data['value'];

        $transactionNumber = $this->transactionService
            ->generateTransactionNumber(8, 'transaction_number');

        DB::beginTransaction();
        try {
            $transactionData = [
                'user_id' => $user->id,
                'transaction_number' => $transactionNumber,
                'type' => $data['type'],
                'amount' => $value,
                'status' => 'pending',
            ];
            $userData = [];
            if ($data['type'] === 'encash' && $user->balance >= $value) {
                $userData['balance'] = $user->balance - $value;
            }

            if ($data['type'] === 'rebate' && $user->rebate >= $value) {
                $userData['rebate']  = $user->rebate - $value;
            }

            $this->userRepository->findById($user->id)->update($userData);
            $transaction = $this->transactionRepository->create($transactionData);

            DB::commit();
            return response()->json($transaction, 201);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'error' => 'Error in saving!'
            ], 501);
        }
    }

    public function show($id)
    {
        $user = Auth::user();
        return $this->transactionRepository->findByIdAndUser($user->id, $id);
    }
}
