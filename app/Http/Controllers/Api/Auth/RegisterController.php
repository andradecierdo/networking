<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\RegistrationCode\RegistrationCodeRepositoryInterface;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;

class RegisterController extends Controller
{
    protected $userRepository;
    protected $registrationCodeRepository;

    /**
     * Initialize the repository used by the controller.
     * The repository handles database processes
     *
     * RegisterController constructor.
     * @param UserRepositoryInterface $userRepository
     * @param RegistrationCodeRepositoryInterface $registrationCodeRepository
     */
    public function __construct(
        UserRepositoryInterface $userRepository,
        RegistrationCodeRepositoryInterface $registrationCodeRepository
    ) {
        $this->userRepository = $userRepository;
        $this->registrationCodeRepository = $registrationCodeRepository;
    }

    public function register(UserRequest $request)
    {
        $userData = $request->validated();
        $userData['password'] = bcrypt($userData['password']);
        $userData['parent_id'] = Auth::user()->id;

        DB::beginTransaction();
        try {
            $user = $this->userRepository->create($userData);
            $this->registrationCodeRepository
                ->findByCodes($userData['passcode'], $userData['security_code'])
                ->update([
                    'user_id' => $user->id,
                ]);

            DB::commit();
            return response()->json($user, 200);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'error' => 'Error in saving!'
            ], 501);
        }
    }
}
