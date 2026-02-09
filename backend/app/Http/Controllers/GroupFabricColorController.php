<?php

namespace App\Http\Controllers;

use App\Models\GroupFabricColor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

class GroupFabricColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view("group_fabric_color.index");
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        GroupFabricColor::create([
            'name' => $validated['name'],
            'is_active' => true,
        ]);
        return back()->with('success', 'Group Fabric Color created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $groupFabricColors = GroupFabricColor::select('*')->get();
        return DataTables::of($groupFabricColors)
            ->addIndexColumn()
            ->addColumn('action', function ($row) {
                $btn = '<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                    <div class="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-cogs"></i> จัดการ
                        </button>
                        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <a class="dropdown-item" href="'.route('group-fabric-color.manage_color', $row->id).'">จัดการสีผ้า</a>
                            <a class="dropdown-item" href="#">แก้ไข</a>
                            <a class="dropdown-item" href="#">ลบ</a>
                        </div>
                    </div>
                </div>';
                return $btn;
            })
            ->make(true);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $groupFabricColor = GroupFabricColor::where('id', $id)->first();
        return response()->json(['data' => $groupFabricColor]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        GroupFabricColor::where('id', $id)->update([
            'name' => $validated['name'],
        ]);
        return back()->with('success', 'Group Fabric Color updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $groupFabricColor = GroupFabricColor::where('id', $id)->first();
            $groupFabricColor->is_active = !$groupFabricColor->is_active;
            $groupFabricColor->updated_at = now();
            $groupFabricColor->save();
            DB::commit();
            return back()->with('success', 'Group Fabric Color status updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            return back()->with('error', 'Failed to update Group Fabric Color status.');
        }
    }

    /**
     * Update the is_active status of the specified resource.
     */
    public function manageColor(string $id)
    {
        $groupFabricColor = GroupFabricColor::where('id', $id)->first();
        return view('group_fabric_color.manage_color', compact('groupFabricColor'));
    }
}
