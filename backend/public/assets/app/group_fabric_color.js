var table = $("#datatables").DataTable({
    processing: true,
    serverSide: true,
    responsive: true,
    ajax: {
        url: "/group-fabric-color/show",
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
        { data: "name", name: "name", width: "55%" },
        {
            data: "is_active",
            render: function (data, type, row) {
                if (data) {
                    return '<span class="badge bg-success">Active</span>';
                } else {
                    return '<span class="badge bg-secondary">Inactive</span>';
                }
            },
            name: "is_active",
        },
        { data: "action", name: "action", orderable: false, searchable: false, width: "20%" },
    ],
});

var card = $("#card");

function addData() {
    $(".modal-title").text("Add Group Fabric Color");
    $("#form")[0].reset();
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#modal-default").modal("show");
    $("#form").attr("action", "/group-fabric-color/store");
}
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
$(document).ready(function () {
    $("#form").validate({
        ignore: ".ignore",
        rules: {
            name: {
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
});

function editData(id, name) {
    $.ajax({
        url: `/group-fabric-color/edit/${id}`,
        type: "GET",
        success: function (response) {
                $(".modal-title").text("Edit Group Fabric Color: " + name);
                $("#form")[0].reset();
                $(".form-control").removeClass("is-invalid");
                $(".invalid-feedback").remove();
                $("#form").attr("action", `/group-fabric-color/update/${id}`);
                $("#name").val(response.data.name);
                $("#modal-default").modal("show");
        }
    });
}

function deleteData(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/group-fabric-color/destroy/${id}`,
                type: "POST",
                success: function (response) {
                    if (response.success) {
                        Swal.fire(
                            "Deleted!",
                            "Your group fabric color has been deleted.",
                            "success"
                        ).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire("Failed!", response.message, "error");
                    }
                },
                error: function (xhr) {
                    Swal.fire("Failed!", xhr.responseText, "error");
                },
            });
        }
    });
}
