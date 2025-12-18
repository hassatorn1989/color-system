<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChangePasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function update(Request $request)
    {
        // Validate the request data
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required',
        ]);

        // Update the user's password
        auth()->user()->update([
            'password' => \Hash::make($request->new_password),
        ]);

        return back()->with('success', 'Password changed successfully');
    }

    function checkCurrentPassword(Request $request) {
        $current_password = $request->input('current_password');
        $isMatch = \Hash::check($current_password, auth()->user()->password);
        return response()->json(['isMatch' => $isMatch]);
    }
}
