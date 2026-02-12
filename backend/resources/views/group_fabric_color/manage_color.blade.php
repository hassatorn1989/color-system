@extends('layout.layout')
@section('title', 'Group Fabric Color Management')
@push('css')
@endpush
@push('js')
    <script src="{{ asset('assets/app/group_fabric_color_manage.js') }}"></script>
@endpush
@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Group Fabric Color Management</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="{{ route('dashboard.index') }}">Dashboard</a></li>
                            <li class="breadcrumb-item"><a href="{{ route('group-fabric-color.index') }}">Group Fabric
                                    Color</a></li>
                            <li class="breadcrumb-item active">Group Fabric Color Management</li>
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
                                <h3 class="card-title">{{ $groupFabricColor->name }}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3 offset-md-9">
                                        <button type="button" class="btn btn-primary btn-block mb-2" id="addNewButton"
                                            data-id="{{ $groupFabricColor->id }}">
                                            <i class="fas fa-plus mr-1"></i>
                                            <span class="btn-text">Add New</span>
                                        </button>
                                    </div>
                                </div>

                                <div class="row">
                                    @if (count($groupFabricColor->subFabricColors) > 0)
                                        @foreach ($groupFabricColor->subFabricColors as $subFabricColor)
                                            <div class="col-md-3 mb-3">
                                                <div class="card " style="width: 18rem;">
                                                    <div class="card-header">
                                                        <h5 class="card-title m-0">{{ $subFabricColor->name }}</h5>
                                                    </div>
                                                    <div class="card-body p-2">
                                                        <div class="row g-2">
                                                            @foreach ($subFabricColor->fabricColors as $item)
                                                                <div class="col-4 mb-2">
                                                                    <div class="color-box"
                                                                        style="background-color: {{ $item->hex_code ?? '#eeeeee' }}; height: 40px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.12);"
                                                                        data-toggle="tooltip" data-placement="top"
                                                                        title="Color {{ $item->hex_code ?? '#eeeeee' }}">
                                                                    </div>
                                                                </div>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                    <div class="card-footer bg-transparent text-right">
                                                        <button class="btn btn-warning btn-sm"
                                                            onclick="editData('{{ $subFabricColor->id }}')"><i
                                                                class="fas fa-edit"></i> Edit</button>
                                                        <button class="btn btn-danger btn-sm"
                                                            onclick="deleteData('{{ $subFabricColor->id }}')"><i
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
                            <!-- /.card-body -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@section('modal')
    <form id="form" method="POST" action="">
        @csrf
        <!-- Modal -->
        <div class="modal fade" id="modal-default" data-backdrop="static" data-keyboard="false" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="dataModalLabel">Add New Group Fabric Color</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="name" name="name"
                                placeholder="Enter name">
                        </div>
                        <hr>
                        <div class="color-container">
                        </div>
                        <button type="button" class="btn btn-info btn-sm btn-block" id="addColorButton">
                            <i class="fas fa-plus mr-1"></i>
                            <span class="btn-text">Add Color</span>
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id="saveButton" class="btn btn-info">
                            <i class="fas fa-save mr-1"></i>
                            <span class="btn-text">Save</span>
                        </button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">
                            <i class="fas fa-times mr-1"></i>
                            <span class="btn-text">Close</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection
