<?php

namespace App\Http\Controllers\MasterData;

use App\Imports\Unit\ProcessImportUnit;
use App\Exports\Unit\TemplateImportUnit;
use App\Exports\Unit\DownloadDataUnit;
use App\Http\Controllers\Controller;
use App\Models\RefUnit;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Yajra\Datatables\Datatables;

class UnitController extends Controller
{
    public function index()
    {
        return view("master-data.unit.index");
    }

    public function dataTableUnit()
    {
        $data = RefUnit::whereNull('deleted_at')
                        ->get([
                                'id',
                                'code_unit',
                                'nama_unit'
                            ]);

        return Datatables::of($data)
            ->addIndexColumn()
            ->make(true);
    }

    public function store(Request $request)
    {
        $dataUnitCreate = [
                            "code_unit" => $request->code_unit,
                            "nama_unit" => $request->nama_unit,
                            "created_at" => date('Y-m-d H:i:s'),
                            "created_by" => auth()->user()->username
                        ];

        $masterUnit = RefUnit::create($dataUnitCreate);

        return redirect()->route('masterDataUnit.index')->with([
            "status"  => 'success',
            "title"   => 'Success!',
            "message" => "Penambahan Unit Berhasil Dilakukan",
        ]);
    }

    public function update(Request $request, $id)
    {
        $unit = RefUnit::find($request->id_value);

        if (!$unit) {
            $message = "failed";
            $code    = 400;
        }

        $unit->code_unit = $request->code_unit;
        $unit->nama_unit = $request->nama_unit;
        $unit->updated_at = date('Y-m-d H:i:s');
        $unit->updated_by = auth()->user()->username;

        $unit->save();

        return redirect()->route('masterDataUnit.index')->with([
            "status"  => 'success',
            "title"   => 'Success!',
            "message" => "Penambahan Unit Berhasil Dilakukan",
        ]);
    }

    public function destroy($id)
    {
        $code     = 200;
        $message  = 'success';
        $unit = RefUnit::find($id);

        $unit->delete();

        if (!$unit) {
            $code     = 400;
            $message  = 'failed';
            $unit = false;
        }

        $data = array(
            'message' => $message,
            'code'    => $code,
            'data'    => $unit,
        );

        return response()->json($data, $code);
    }

    public function show($id)
    {
        $message  = "success";
        $code     = 200;
        $Unit = false;

        $Unit = RefUnit::find($id);

        if (!$Unit) {
            $message = "failed";
            $code    = 400;
        }

        $data = array(
            'message' => $message,
            'code'    => $code,
            'data'    => $Unit,
        );
        return response()->json($data, $code);
    }

    public function export() {
        return Excel::download(new DownloadDataUnit(), 'Data Unit.xlsx');
    }

    public function template_import()
    {

        return Excel::download(new TemplateImportUnit, 'Template Import Unit.xlsx');
    }

    public function import_unit(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx',
        ]);

        try {
            $import = Excel::import(new ProcessImportUnit, $request->file);

            return redirect()->back()->with([
                "status"  => 'success',
                "title"   => 'Success!',
                "message" => "File has been import",
            ]);
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            $failures = $e->failures();

            foreach ($failures as $failure) {
                $failure->row(); // row that went wrong
                $failure->attribute(); // either heading key (if using heading row concern) or column index
                $failure->errors(); // Actual error messages from Laravel validator
                $failure->values(); // The values of the row that has failed.
            }

            return redirect()->back()->with([
                "status"  => 'success',
                "title"   => 'Success!',
                "message" => "Error: ".$failure->values()." has ".$failure->values(),
            ]);
       }
    }
}
