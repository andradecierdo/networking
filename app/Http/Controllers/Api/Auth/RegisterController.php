<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\User\UserRepositoryInterface;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    protected $userRepository;

    /**
     * Initialize the repository used by the controller.
     * The repository handles database processes
     *
     * RegisterController constructor.
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(UserRequest $request)
    {
        $userData = $request->validated();
        $userData['password'] = bcrypt($userData['password']);
        $userData['parent_id'] = Auth::user()->id;

        $user = $this->userRepository->create($userData);

        return response()->json($user, 200);
    }
}
