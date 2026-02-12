<?php

namespace App\Http\Controllers;

use App\Models\GroupFabricColor;
use App\Models\SubFabricColor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;

use function Symfony\Component\String\s;

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
                            <a class="dropdown-item" href="'.route('group-fabric-color.manage_color', $row->id). '">จัดการสีผ้า</a>
                            <a class="dropdown-item" href="#" onclick="editData(\''.$row->id.'\', \''.htmlspecialchars($row->name, ENT_QUOTES).'\')">แก้ไข</a>
                            <a class="dropdown-item" href="#" onclick="deleteData(\''.$row->id.'\')">ลบ</a>
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
        DB::transaction(function () use ($id) {
            // First, delete associated sub fabric colors and their fabric colors
            $groupFabricColor = GroupFabricColor::where('id', $id)->first();
            foreach ($groupFabricColor->subFabricColors as $subFabricColor) {
                // Delete associated fabric colors
                $subFabricColor->fabricColors()->delete();
                // Delete the sub fabric color
                $subFabricColor->delete();
            }
            // Finally, delete the group fabric color
            $groupFabricColor->delete();
        });
        return response()->json(['success' => true, 'message' => 'Group Fabric Color deleted successfully.']);
    }

    /**
     * Update the is_active status of the specified resource.
     */
    public function manageColor(string $id)
    {
        $groupFabricColor = GroupFabricColor::where('id', $id)->first();
        return view('group_fabric_color.manage_color', compact('groupFabricColor'));
    }

    function manageColorStore(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'colors' => 'required|array',
            'color_name' => 'required|array',
            'colors.*' => 'required|string',
            'color_name.*' => 'required|string|max:255',
        ]);
        DB::transaction(function () use ($validated, $id) {
            $subFabricColor = SubFabricColor::create([
                'name' => $validated['name'],
                'group_fabric_color_id' => $id
            ]);

            foreach ($validated['colors'] as $index => $color) {
                $subFabricColor->fabricColors()->create([
                    'name' => $validated['color_name'][$index],
                    'hex_code' => $color,
                ]);
            }
        });
        return back()->with('success', 'Sub Fabric Colors added successfully.');
    }

    function manageColorEdit(string $id)
    {
        $subFabricColor = SubFabricColor::with('fabricColors')->where('id', $id)->first();
        return response()->json(['data' => $subFabricColor]);
    }

    function manageColorUpdate(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'colors' => 'required|array',
            'color_name' => 'required|array',
            'colors.*' => 'required|string',
            'color_name.*' => 'required|string|max:255',
        ]);
        DB::transaction(function () use ($validated, $id) {
            $subFabricColor = SubFabricColor::where('id', $id)->first();
            $subFabricColor->name = $validated['name'];
            $subFabricColor->save();

            // Delete existing fabric colors
            $subFabricColor->fabricColors()->delete();

            // Add updated fabric colors
            foreach ($validated['colors'] as $index => $color) {
                $subFabricColor->fabricColors()->create([
                    'name' => $validated['color_name'][$index],
                    'hex_code' => $color,
                ]);
            }
        });
        return back()->with('success', 'Sub Fabric Colors updated successfully.');
    }

    function manageColorDestroy(string $id)
    {
        DB::transaction(function () use ($id) {
            $subFabricColor = SubFabricColor::where('id', $id)->first();
            // Delete associated fabric colors
            $subFabricColor->fabricColors()->delete();
            // Delete the sub fabric color
            $subFabricColor->delete();
        });
        return response()->json(['success' => true, 'message' => 'Sub Fabric Color deleted successfully.']);
    }
}
