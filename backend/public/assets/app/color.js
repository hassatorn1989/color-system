var card = $("#card");

function addData() {
    $(".modal-title").text("Add Color");
    $("button[type=submit] .btn-text").text("Create");
    $("#form")[0].reset();
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#modal-default").modal("show");
    $("#form").attr("action", "/color/create");
}
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
$(document).ready(function () {
    $("#form").validate({
        ignore: ".ignore",
        rules: {
            groupColorName: {
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

function editData(id) {
    $.ajax({
        url: `/color/edit/${id}`,
        type: "GET",
        success: function (response) {
            if (response.status) {
                $(".modal-title").text("Edit Color");
                $("button[type=submit] .btn-text").text("Update");
                $("#form")[0].reset();
                $(".form-control").removeClass("is-invalid");
                $(".invalid-feedback").remove();
                $("#modal-default").modal("show");
                $("#form").attr("action", `/color/update/${id}`);
                $("#groupColorName").val(response.data.name);
                response.data.get_colors.forEach((color, index) => {
                    $(`input[name='color[${index}]']`).val(color.color);
                });
            }
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
                url: `/color/destroy/${id}`,
                type: "DELETE",
                data: {
                    _token: $("meta[name=csrf-token]").attr("content"),
                },
                success: function (response) {
                    if (response.status) {
                        Swal.fire(
                            "Deleted!",
                            "Your file has been deleted.",
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
