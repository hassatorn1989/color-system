<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pattern;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Str;

class PatternController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patterns = Pattern::select('*')->get();
        return view("pattern.index", ['patterns' => $patterns]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'name' => 'required',
                'file' => 'required|mimes:jpg,jpeg,png,svg,gif|max:10240',
            ]);
            $file = $request->file('file');
            $originalName = $file->getClientOriginalName();
            $path = $file->store('uploads', 'public');
            $pattern = new Pattern();
            $pattern->name = $request->name;
            $pattern->file_name = $originalName;
            $pattern->file_path = $path;
            $pattern->created_by = Auth::user()->username;
            $pattern->updated_by = Auth::user()->username;
            $pattern->created_at = now();
            $pattern->updated_at = now();

            $pattern->save();
            DB::commit();
            return redirect()->back()->with('success', 'Pattern uploaded successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            return redirect()->back()->with('error', 'Pattern upload failed.');
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pattern = Pattern::find($id);
        if ($pattern) {
            return response()->json(['status' => true, 'data' => $pattern]);
        } else {
            return response()->json(['status' => false, 'message' => 'Pattern not found.']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $pattern = Pattern::find($id);
            if (!$pattern) {
                return redirect()->back()->with('error', 'Pattern not found.');
            }
            // update svg file
            if ($request->hasFile('file')) {
                $request->validate([
                    'file' => 'mimes:jpg,jpeg,png,svg,gif|max:10240',
                ]);
                // delete the old file from storage
                $oldFilePath = public_path('storage/' . $pattern->file_path);
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
                // upload the new file
                $file = $request->file('file');
                $originalName = $file->getClientOriginalName();
                $path = $file->store('uploads', 'public');
                $pattern->file_name = $originalName;
                $pattern->file_path = $path;
                $pattern->updated_by = Auth::user()->username;
                $pattern->updated_at = now();
                $pattern->save();
                DB::commit();
                return redirect()->back()->with('success', 'Pattern updated successfully.');
            }else{
                $pattern->name = $request->name;
                $pattern->updated_by = Auth::user()->username;
                $pattern->updated_at = now();
                $pattern->save();
                DB::commit();
                return redirect()->back()->with('success', 'Pattern updated successfully.');
            }

        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Pattern update failed.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $pattern = Pattern::find($id);
            if ($pattern) {
                // delete the file from storage
                $filePath = public_path('storage/' . $pattern->file_path);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
                // delete the record from database
                $pattern->delete();
                DB::commit();
                return response()->json(['status' => true, 'message' => 'Pattern deleted successfully.']);
            } else {
                return response()->json(['status' => false, 'message' => 'Pattern not found.']);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['status' => false, 'message' => 'Pattern deletion failed.']);
        }
    }
}
