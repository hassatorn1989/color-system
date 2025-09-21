@extends('layout.layout')
@section('title', 'Dashboard')
@push('css')
@endpush
@push('js')
    <script src="{{ asset('assets/app/color.js') }}"></script>
@endpush
@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Color</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Color</li>
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
                                <h3 class="card-title">User Management</h3>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-end mb-3">
                                    <button onclick="addData()" id="addButton" class="btn btn-primary">
                                        <i class="fas fa-plus-circle"></i>&nbsp;
                                        Add New
                                    </button>
                                </div>
                                <div class="row">
                                    @if (count($groupColors) > 0)
                                       @foreach ($groupColors as $groupColor)
                                        <div class="col-md-3 mb-3">
                                            <div class="card " style="width: 18rem;">
                                                <div class="card-header">
                                                    <h5 class="card-title m-0">{{ $groupColor->name }}</h5>
                                                </div>
                                                <div class="card-body p-2">
                                                    <div class="row g-2">
                                                        @foreach ($groupColor->getColors as $item)
                                                            <div class="col-4 mb-2">
                                                                <div class="color-box"
                                                                    style="background-color: {{ $item->color ?? '#eeeeee' }}; height: 40px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"
                                                                    data-toggle="tooltip" data-placement="top"
                                                                    title="Color {{ $item->priority }} - {{ $item->color ?? '#eeeeee' }}">
                                                                </div>
                                                            </div>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <div class="card-footer bg-transparent text-right">
                                                    {{-- <button class="btn btn-primary btn-sm" onclick="editData({{ $color->id }})"><i class="fas fa-edit"></i> Edit</button> --}}
                                                    <button class="btn btn-warning btn-sm"
                                                        onclick="editData('{{ $groupColor->id }}')"><i
                                                            class="fas fa-edit"></i> Edit</button>
                                                    <button class="btn btn-danger btn-sm"
                                                        onclick="deleteData('{{ $groupColor->id }}')"><i
                                                            class="fas fa-trash"></i> Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                    @else
                                        <div class="col-12">
                                            <div class="alert alert-warning text-center" role="alert">
                                                No colors found. Please add a new color group.
                                            </div>
                                        </div>
                                    @endif

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
                <form id="form" method="POST" data-id="">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="groupColorName">Group Name</label>
                            <input type="text" class="form-control" id="groupColorName" name="groupColorName"
                                placeholder="Enter group color name">
                        </div>

                        <div class="row">
                            @for ($i = 0; $i < 12; $i++)
                                <div class="col-4">
                                    <div class="form-group">
                                        <label for="color{{ $i }}">Color {{ $i + 1 }}</label>
                                        <input type="color" class="form-control" id="color{{ $i }}"
                                            name="color[{{ $i }}]"
                                            placeholder="Enter Color {{ $i }}">
                                    </div>
                                </div>
                            @endfor
                        </div>

                    </div>
                    <div class="modal-footer justify-content-end">
                        <button type="submit" class="btn btn-info">
                            <i class="fas fa-save"></i>
                            <span class="btn-text">Save</span>
                        </button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-times"></i>
                            Close</button>

                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
