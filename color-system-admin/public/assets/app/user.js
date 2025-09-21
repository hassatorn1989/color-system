var table = $("#datatables").DataTable({
    processing: true,
    serverSide: true,
    responsive: true,
    ajax: {
        url: "/user/show",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    },
    columns: [
        {
            data: "DT_RowIndex",
            name: "DT_RowIndex",
            orderable: false,
            searchable: false,
            width: "5%",
            className: "text-center",
        },
        { data: "username", name: "username" ,width: "20%"},
        { data: "fullname", name: "fullname", width: "25%" },
        { data: "role", name: "role", width: "20%" },
        {
            data: "status",
            render: function (data, type, row) {
                if (data) {
                    return '<span class="badge bg-success">Active</span>';
                } else {
                    return '<span class="badge bg-secondary">Inactive</span>';
                }
            },
            name: "status",
        },
        { data: "action", name: "action", orderable: false, searchable: false, width: "20%" },
    ],
});

$("#form").validate({
    ignore: ".ignore",
    rules: {
        username: {
            required: true,
        },
        fullname: {
            required: true,
        },
        password: {
            required: function (element) {
                if ($("#form").attr("action").includes("create")) {
                    return true;
                }
                return false;
            },
        },
        role: {
            required: true,
        },
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
        error.addClass("invalid-feedback");
        element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass("is-invalid");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass("is-invalid");
    },
    submitHandler: function (form) {
        $("#form button[type=submit]")
            .empty()
            .html(
                '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> ' +
                    '<span class="">Saving...</span>'
            )
            .attr("disabled", true);
        form.submit();
    },
});

function addData() {
    $(".modal-title").text("Add User");
    $("#username").prop("readonly", false);
    $("button[type=submit] .btn-text").text("Create");
    $("#form")[0].reset();
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#modal-default").modal("show");
    $("#form").attr("action", "/user/create");
}

function editUser(button) {
    var id = $(button).data("id");
    $(".modal-title").text("Edit User");
    $("button[type=submit] .btn-text").text("Update");
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#form").attr("action", "/user/update/" + id);
    $("#username").prop("readonly", true);
    $.ajax({
        url: "/user/edit/" + id,
        type: "GET",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        success: function (response) {
            console.log(response);
            $("#username").val(response.username);
            $("#fullname").val(response.fullname);
            $("#role").val(response.role);
            $("#modal-default").modal("show");
        }
    });
}

function updateIsActive(id) {
    // swal delete
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/user/destroy/${id}`,
                type: "POST",
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                success: function (response) {
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                    table.ajax.reload();
                },
                error: function (xhr) {
                    Swal.fire("Error!", "Failed to delete user.", "error");
                },
            });
        }
    });
}
