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
            ->addColumn('action', function ($groupFabricColor) {
                $btn = '<button class="btn btn-sm btn-warning mr-1" data-id="' . $groupFabricColor->id . '" onclick="editGroupFabricColor(this)"><i class="fas fa-edit mr-1"></i> Edit</button>';
                $btn .= $groupFabricColor->id && $groupFabricColor->is_active
                    ? '<button class="btn btn-sm btn-danger" onclick="updateIsActive(this)" data-id="' . $groupFabricColor->id . '"><i class="fas fa-trash mr-1"></i> Deactivate</button>'
                    : ($groupFabricColor->id ? '<button class="btn btn-sm btn-success" onclick="updateIsActive(this)" data-id="' . $groupFabricColor->id . '"><i class="fas fa-check mr-1"></i> Activate</button>' : '');
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
}
