<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::withCount(['pickupRequests', 'recyclingRecords'])->get();
        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'type' => 'required|in:household,business,collector,admin',
        ]);

        $user->update(['type' => $request->type]);
        return redirect()->route('admin.users')->with('success', 'User role updated!');
    }

    public function destroy(User $user)
    {
        if ($user->type === 'admin' && User::where('type', 'admin')->count() <= 1) {
            return back()->withErrors(['user' => 'Cannot delete the last admin user.']);
        }
        $user->delete();
        return redirect()->route('admin.users')->with('success', 'User deleted!');
    }
}