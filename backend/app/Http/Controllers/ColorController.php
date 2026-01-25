<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\GroupColor;
use \App\Models\Color;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groupColors = GroupColor::with('getColors')->where('is_active', true)->get();
        // dd($groupColors);
        return view("color.index",["groupColors"=> $groupColors,]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        try {

            $request->validate([
                "groupColorName" => "required",
            ]);
            $groupColor = new GroupColor();
            $groupColor->name = $request->groupColorName;
            $groupColor->is_active = true;
            $groupColor->created_at = now();
            $groupColor->updated_at = now();
            $groupColor->save();


            foreach ($request->color as $key => $value) {
                $color = new Color();
                $color->group_color_id = $groupColor->id;
                $color->priority = $key + 1;
                $color->color = $value;
                $color->is_active = true;
                $color->created_by = Auth::user()->username ?? 'System';
                $color->updated_by = Auth::user()->username ?? 'System';
                $color->created_at = now();
                $color->updated_at = now();
                $color->save();
            }
            DB::commit();
            return back()->with('success', 'Color created successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', $th->getMessage());
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

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $groupColors = GroupColor::with('getColors')->where('id', $id)->first();
        return response()->json(['status' => true, 'data' => $groupColors]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {

            $request->validate([
                "groupColorName" => "required",
            ]);
            $groupColor = GroupColor::findOrFail(id: $id);
            $groupColor->name = $request->groupColorName;
            $groupColor->updated_at = now();
            $groupColor->save();

            // delete old color
            $oldColors = Color::where('group_color_id', $groupColor->id)->get();
            foreach ($oldColors as $oldColor) {
                $oldColor->delete();
            }

            foreach ($request->color as $key => $value) {
                // dd($oldColors[$key]->created_by);
                $color = new Color();
                $color->group_color_id = $groupColor->id;
                $color->priority = $key + 1;
                $color->color = $value;
                $color->is_active = true;
                $color->created_by = $oldColors[$key]->created_by;
                $color->updated_by = Auth::user()->username;
                $color->created_at = now();
                $color->updated_at = now();
                $color->save();
            }
            DB::commit();
            return back()->with('success', 'Color updated successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->with('error', $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $groupColor = GroupColor::findOrFail($id);
            $color = Color::where('group_color_id', $groupColor->id);
            $color->delete();
            $groupColor->delete();
            return response()->json(['status' => true, 'message' => 'Color deleted successfully.']);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()], 500);
        }
    }
}
