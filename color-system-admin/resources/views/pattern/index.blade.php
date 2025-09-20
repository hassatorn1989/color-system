@extends('layout.layout')
@section('title', 'Dashboard')
@push('css')
    <link rel="stylesheet" href="{{ asset('assets/plugins/dropify/dropify.css') }}">
    <style>
        .dropify-wrapper .dropify-message span.file-icon::before {
            content: "\f093"; /* fa-upload Unicode for FA5 solid */
            font-family: "Font Awesome 5 Free"; /* FA5 */
            font-weight: 900; /* solid icons */
        }
        .file-icon p{
            font-size: 20px;
        }
        .dropify-wrapper {
            border: 2px dashed #d2d6de;
            border-radius: 10px;
        }
    </style>
@endpush
@push('js')
    <script src="{{ asset('assets/plugins/dropify/dropify.min.js') }}"></script>
    <script src="{{ asset('assets/app/pattern.js') }}"></script>
@endpush
@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Pattern</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Pattern</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <!-- /.card-header -->
                            <div class="card-header">
                                <div class=" mt-3 d-flex justify-content-between">
                                    <div>
                                        <h4>Palette Generator</h4>
                                    </div>
                                    <button onclick="addData()" id="addButton" class="btn btn-primary">
                                        <i class="fas fa-plus-circle"></i>&nbsp;
                                        Add New
                                    </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    @foreach ($patterns as $pattern)
                                        <div class="col-3 mb-3">
                                            <div class="card" style="width: 100%;">
                                                <div class="card-header">
                                                    <h5 class="card-title m-0">{{ $pattern->name }}</h5>
                                                </div>
                                                <div class="card-body p-2 d-flex justify-content-center align-items-center">
                                                    <div class="row g-2">
                                                        {{-- @foreach ($groupColor->getColors as $item) --}}
                                                        <div class="col-4">
                                                            <img src="{{ asset('storage/' . $pattern->file_path) }}" alt="" width="150" height="150">
                                                        </div>
                                                        {{-- @endforeach --}}
                                                    </div>
                                                </div>
                                                <div class="card-footer bg-transparent text-right">
                                                    {{-- <button class="btn btn-primary btn-sm" onclick="editData({{ $color->id }})"><i class="fas fa-edit"></i> Edit</button> --}}
                                                    <button class="btn btn-warning btn-sm"
                                                        onclick="editData('{{ $pattern->id }}')"><i
                                                            class="fas fa-edit"></i> Edit</button>
                                                    <button class="btn btn-danger btn-sm"
                                                        onclick="deleteData('{{ $pattern->id }}')"><i
                                                            class="fas fa-trash"></i> Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@section('modal')
    <div class="modal fade" id="modal-default">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Color</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="form" method="POST" data-id="" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">Pattern Name</label>
                            <input type="text" class="form-control" id="name" name="name" placeholder="Enter pattern name">
                        </div>
                        <div class="form-group">
                            <label for="file">Pattern File (SVG)</label>
                            <input name="file" id="file" type="file" class="dropify" data-allowed-file-extensions="svg" accept="image/svg+xml" />
                        </div>
                    </div>
                    <div class="modal-footer justify-content-end">
                        <button type="submit" class="btn btn-info">
                            <i class="fas fa-save mr-1"></i>
                            <span class="btn-text">Save</span>
                        </button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-times mr-1"></i>
                            Close</button>

                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
