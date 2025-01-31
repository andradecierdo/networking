<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\RegistrationCode\RegistrationCodeRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Http\Services\CodeGeneratorService;

class RegistrationCodeController extends Controller
{
    protected $registrationCodeRepository;
    protected $codeGeneratorService;

    /**
     * Initialize the repository used by the controller.
     * The repository handles database processes
     *
     * RegisterController constructor.
     * @param RegistrationCodeRepositoryInterface $registrationCodeRepository
     * @param CodeGeneratorService $codeGeneratorService
     */
    public function __construct(
        RegistrationCodeRepositoryInterface $registrationCodeRepository,
        CodeGeneratorService $codeGeneratorService
    ) {
        $this->registrationCodeRepository = $registrationCodeRepository;
        $this->codeGeneratorService = $codeGeneratorService;
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
        $searchData['keyword'] = $request->keyword ?? null;
        $searchData['order'] = $request->order ?? null;
        $searchData['orderBy'] = $request->orderBy ?? null;

        return $this->registrationCodeRepository->search($relations, $searchData);
    }

    public function index(Request $request)
    {
        return $this->registrationCodeRepository->loadAllWithUser();
    }

    public function store(Request $request)
    {
        $regCodeData = $request->validated();
        $regCode = $this->registrationCodeRepository->create($regCodeData);

        return response()->json($regCode, 201);
    }

    public function delete($id)
    {
        $this->registrationCodeRepository->deleteById($id);

        return response(['success' => true], 200);
    }

    public function generateCode()
    {
        $passCode = $this->codeGeneratorService->generateRandomCode(6, 'passcode');
        $securityCode = $this->codeGeneratorService->generateRandomCode(3, 'security_code', 'ACS');

        $regCode = $this->registrationCodeRepository->create([
            'passcode' => $passCode,
            'security_code' => $securityCode,
        ]);

        return response()->json($regCode, 201);
    }
}
