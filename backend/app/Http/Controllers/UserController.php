<?php

namespace App\Http\Controllers;

use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view("user.index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'username' => 'required|string|max:255|unique:users,username',
                'fullname' => 'required|string|max:255',
                'password' => 'required',
                'role' => 'required|in:admin,user',
            ]);

            $user = new User();
            $user->username = $request->username;
            $user->password = bcrypt($request->password);
            $user->fullname = $request->fullname;
            $user->role = $request->role;
            $user->status = true;
            $user->created_at = now();
            $user->updated_at = now();
            $user->save();
            DB::commit();
            return back()->with('success','User created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error','Failed to create user.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $users = User::select('id', 'username', 'fullname', 'role', 'status')->get();
        return DataTables::of($users)
            ->addIndexColumn()
            ->addColumn('action', function ($user) {
                $btn = '<button class="btn btn-sm btn-warning mr-1" data-id="' . $user->id . '" onclick="editUser(this)"><i class="fas fa-edit mr-1"></i> Edit</button>';
                $btn .= $user->id && $user->status
                    ? '<button class="btn btn-sm btn-danger" onclick="updateIsActive(\'' . $user->id . '\')"><i class="fas fa-trash mr-1"></i> Deactivate</button>'
                    : ($user->id ? '<button class="btn btn-sm btn-success" onclick="updateIsActive(\'' . $user->id . '\')"><i class="fas fa-check mr-1"></i> Activate</button>' : '');
                return $btn;
            })
            ->make(true);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $users = User::where('id', $id)->first();
        return response()->json($users);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {

            $users = User::where('id', $id)->first();
            $users->username = $request->username;
            $users->fullname = $request->fullname;
            if ($request->password !== '' && $request->password !== null && $request->password !== 'undefined') {
                $users->password = bcrypt($request->password);
            }
            $users->role = $request->role;
            $users->updated_at = now();
            $users->save();
            DB::commit();
            return back()->with('success','User updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error','Failed to update user.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $users = User::where('id', $id)->first();
            $users->status = !$users->status;
            $users->updated_at = now();
            $users->save();
            DB::commit();
            return back()->with('success','User status updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            return back()->with('error','Failed to update user status.');
        }
    }
}
