<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\RegistrationCode\RegistrationCodeRepositoryInterface;

class RegistrationCodeController extends Controller
{
    protected $registrationCodeRepository;

    /**
     * Initialize the repository used by the controller.
     * The repository handles database processes
     *
     * RegisterController constructor.
     * @param RegistrationCodeRepositoryInterface $registrationCodeRepository
     */
    public function __construct(RegistrationCodeRepositoryInterface $registrationCodeRepository)
    {
        $this->registrationCodeRepository = $registrationCodeRepository;
    }

    public function index(Request $request)
    {

    }

    public function store()
    {

    }

    public function delete()
    {

    }
}
