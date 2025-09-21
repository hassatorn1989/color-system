@extends('layout.layout')
@section('title', 'Dashboard')
@push('css')
@endpush
@push('js')
    <script src="{{ asset('assets/app/user.js') }}"></script>
@endpush
@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">User</h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">User</li>
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
                                                    <th>Username</th>
                                                    <th>Full Name</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                    <th style="width: 150px">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {{-- @foreach ($users as $key => $user)
                                            <tr>
                                                <td>{{ $key + 1 }}</td>
                                                <td>{{ $user->name }}</td>
                                                <td>{{ $user->email }}</td>
                                                <td>{{ $user->role }}</td>
                                                <td>
                                                    <button onclick="editData({{ $user->id }})"
                                                        class="btn btn-sm btn-info">
                                                        <i class="fas fa-edit"></i>&nbsp; Edit
                                                    </button>
                                                    <button onclick="deleteData({{ $user->id }})"
                                                        class="btn btn-sm btn-danger">
                                                        <i class="fas fa-trash-alt"></i>&nbsp; Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        @endforeach --}}
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
    <!-- Modal -->
    <div class="modal fade" id="modal-default">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="dataModalLabel">Add New User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="form" method="POST" action="">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="username">User Name</label>
                            <input type="text" class="form-control" id="username" name="username"
                                placeholder="Enter username">
                        </div>

                        <div class="form-group">
                            <label for="fullname">Full Name</label>
                            <input type="text" class="form-control" id="fullname" name="fullname"
                                placeholder="Enter full name">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password"
                                placeholder="Enter password">
                        </div>

                        {{-- role --}}
                        <div class="form-group">
                            <label for="role">Role</label>
                            <select class="form-control" id="role" name="role">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
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
                </form>

            </div>
        </div>
    </div>
@endsection
