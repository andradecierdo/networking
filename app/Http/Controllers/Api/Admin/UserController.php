<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\RegistrationCode\RegistrationCodeRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;

class UserController extends Controller
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

    /**
     * Search a listing of the resource.
     *
     * @param Request $request
     * @return LengthAwarePaginator|mixed
     */
    public function search(Request $request)
    {
        $relations = $request->relations ?? [];
        $searchData['parentId'] = $request->parentId ?? null;
        $searchData['keyword'] = $request->keyword ?? null;
        $searchData['exceptions'] = $request->exceptions ?? [];
        $searchData['order'] = $request->order ?? null;
        $searchData['orderBy'] = $request->orderBy ?? null;

        return $this->userRepository->search($relations, $searchData);
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return LengthAwarePaginator|mixed
     */
    public function index(Request $request)
    {
        return $this->userRepository->loadNonAdminWithParent();
    }

    public function store(UserRequest $request)
    {
        $userData = $request->validated();
        $userData['password'] = bcrypt($userData['password']);
        if (empty($userData['parent_id'])) {
            $userData['parent_id'] = Auth::user()->id;
        }

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

    public function update(AdminUpdateUserRequest $request, User $user)
    {
        $userData = $request->validated();
        if (empty($userData['parent_id'])) {
            $userData['parent_id'] = Auth::user()->id;
        }
        if (!empty($userData['password'])) {
            $userData['password'] = bcrypt($userData['password']);
        }
        $user = $this->userRepository
            ->setModel($user)
            ->update($userData);

        return response()->json($user, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $this->userRepository->deleteById($id);

        return response(['success' => true], 200);
    }

    public function show($id)
    {
        return $this->userRepository->findByIdWithParentAndRelationCount($id);
    }
}
