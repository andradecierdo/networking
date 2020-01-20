<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Carbon\Carbon;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        $user = User::query()
            ->where('username', $data['username'])
            ->firstOrFail();
        $credentials = [
            'username' => $data['username'],
            'password' => $data['password'],
        ];
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'error' => 'invalid_credentials',
            ], 401);
        }
        $token = $user->createToken('Personal Access Token');

        return response()->json([
            'token_type' => 'Bearer',
            'expires_in' => Carbon::parse($token->token->expires_at)->toDateTimeString(),
            'access_token' => $token->accessToken,
        ], 200);
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true,
            ]);
        $accessToken->revoke();

        return response()->json([], 201);
    }

    public function getUser(Request $request)
    {
        return $request->user();
    }
}
