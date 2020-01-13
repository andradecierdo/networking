<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExperienceRequest;
use App\Repositories\Experience\ExperienceRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    protected $experienceRepository;

    /**
     * Initialize the repository used by the controller.
     * The repository handles database processes
     *
     * RegisterController constructor.
     * @param ExperienceRepositoryInterface $experienceRepository
     */
    public function __construct(ExperienceRepositoryInterface $experienceRepository)
    {
        $this->experienceRepository = $experienceRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return LengthAwarePaginator|mixed
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return $this->experienceRepository->loadAllByUser($user->id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ExperienceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ExperienceRequest $request)
    {
        $user = $request->user();
        $experienceData = $request->validated();
        $experienceData['user_id'] = $user->id;
        $experience = $this->experienceRepository->create($experienceData);

        return response()->json($experience, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \Illuminate\Http\Request $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        return $this->experienceRepository->findByIdAndUser($user->id, $id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ExperienceRequest $request
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function update(ExperienceRequest $request, $id)
    {
        $experience = $this->experienceRepository->findById($id);
        $experience = $this->experienceRepository
            ->setModel($experience)
            ->update($request->validated());

        return response()->json($experience, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $this->experienceRepository->deleteById($id);

        return response(['success' => true], 200);
    }
}
