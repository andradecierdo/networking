<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
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

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return LengthAwarePaginator|mixed
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        return $this->userRepository->loadAllByParent($user->id);
    }


    public function update(UpdateUserRequest $request, User $user)
    {
        $user = $this->userRepository
            ->setModel($user)
            ->update($request->validated());

        return response()->json($user, 201);
    }
}
