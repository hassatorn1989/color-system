$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$('#addNewButton').on('click', function() {
    // Clear previous inputs
    // $('#colorForm')[0].reset();
    $('.color-container').empty();

    // Add initial color input
    addColorInput();
    $(".modal-title").text("Add Woven Colors");
    $("#form")[0].reset();
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#modal-default").modal("show");
    $("#form").attr("action", "/group-fabric-color/manage-color/store/" + $(this).data('id'));
    $('#modal-default').modal('show');
    reIndexColors();
});

function addColorInput(name = '', colorValue = '') {
    const colorInputHtml = `
        <div class="row mb-2">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" class="form-control" name="color_name[]" value="${name}" placeholder="Enter Color Name">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group mb-2 color-input-group">
                    <input type="color" class="form-control color-input" name="colors[]" value="${colorValue}">
                    <div class="input-group-append">
                        <button class="btn btn-danger remove-color-button" type="button">
                            <i class="fas fa-minus-circle"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    $('.color-container').append(colorInputHtml);
}

$(document).on('click', '.remove-color-button', function() {
    $(this).closest('.color-input-group').remove();
    reIndexColors();
});

$('#addColorButton').on('click', function() {
    addColorInput();
    reIndexColors();
});

function reIndexColors() {
    $('.color-input').each(function(index) {
        $(this).attr('name', 'colors[' + index + ']');
    });
    $('input[name^="color_name"]').each(function(index) {
        $(this).attr('name', 'color_name[' + index + ']');
    });
}

$('#form').on('submit', function() {
    $('#form [name^="colors"]').each(function() {
        $(this).rules('add', {
            required: true
        });
    });
    $('#form [name^="color_name"]').each(function() {
        $(this).rules('add', {
            required: true
        });
    });
});

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

function editData(id) {
    $(".modal-title").text("Edit Woven Colors");
    $("#form")[0].reset();
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#modal-default").modal("show");
    $("#form").attr("action", "/group-fabric-color/manage-color/update/" + id);

    // Fetch existing data
    $.get("/group-fabric-color/manage-color/edit/" + id, function (response) {
        // console.log(response.data);
        const data = response.data;
        $("#name").val(data.name);

        $('.color-container').empty();
        data.fabric_colors.forEach(function(color) {
            addColorInput(color.name, color.hex_code);
        });
        reIndexColors();
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
                url: `/group-fabric-color/manage-color/destroy/${id}`,
                type: "POST",
                success: function (response) {
                    if (response.success) {
                        Swal.fire(
                            "Deleted!",
                            "Your data has been deleted.",
                            "success"
                        ).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire(
                            "Error!",
                            "There was an error deleting the data.",
                            "error"
                        );
                    }
                },
            });
        }
    });
}
