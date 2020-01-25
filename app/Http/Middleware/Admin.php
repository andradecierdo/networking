<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $user = Auth::user();
        if (!Auth::guard($guard)->check() || !$user->is_admin) {
            return response()->json([
                'error' => 'Permission denied'
            ], 403);
        }

        return $next($request);
    }
}
