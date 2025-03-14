<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Role
{
    public function handle(Request $request, Closure $next, $role)
    {
        Log::info('Role Middleware', [
            'url' => $request->url(),
            'role' => $role ?? 'not provided',
            'user' => $request->user() ? $request->user()->toArray() : 'none',
        ]);

        if (!$request->user()) {
            return redirect()->route('login'); // Redirect to login if not authenticated
        }

        if (!$request->user() || $request->user()->type !== $role) {
            abort(403, 'Unauthorized action.');
        }
        return $next($request);
    }
}