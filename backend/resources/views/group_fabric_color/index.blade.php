@extends('layout.layout')
@section('title', 'Woven Colors')
@push('css')
@endpush
@push('js')
    <script src="{{ asset('assets/app/group_fabric_color.js') }}"></script>
@endpush
@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Woven Colors</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Woven Colors</li>
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
                                <h3 class="card-title">Woven Colors</h3>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-end mb-3">
                                    <button onclick="addData()" id="addButton" class="btn btn-primary">
                                        <i class="fas fa-plus-circle mr-1"></i>
                                        Add New
                                    </button>
                                </div>
                                <div class="row">
                                    <div class="col-12 table-responsive">
                                        <table class="table table-striped table-sm" id="datatables" style="width:100%">
                                            <thead>
                                                <tr>
                                                    <th style="width: 10px">#</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th style="width: 150px">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
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
        <div class="modal fade" id="modal-default">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="dataModalLabel">Add New Woven Colors</h5>
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
