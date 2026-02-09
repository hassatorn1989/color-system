$('#addNewButton').on('click', function() {
    // Clear previous inputs
    // $('#colorForm')[0].reset();
    $('.color-container').empty();

    // Add initial color input
    addColorInput();
    $(".modal-title").text("Add Group Fabric Color");
    $("#form")[0].reset();
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#modal-default").modal("show");
    $("#form").attr("action", "/group-fabric-color/store");
    $('#modal-default').modal('show');
});

function addColorInput(colorValue = '') {
    const colorInputHtml = `
        <div class="row mb-2">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" class="form-control" name="color_name[]" value="">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group mb-2 color-input-group">
                    <input type="color" class="form-control color-input" name="colors[]" value="${colorValue}">
                    <div class="input-group-append">
                        <button class="btn btn-danger remove-color-button" type="button">
                            <i class="fas fa-minus"></i>
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
});

$('#addColorButton').on('click', function() {
    addColorInput();
});

// function openAddModal() {
//     $(".modal-title").text("Add Group Fabric Color");
//     $("#form")[0].reset();
//     $(".form-control").removeClass("is-invalid");
//     $(".invalid-feedback").remove();
//     $("#modal-default").modal("show");
//     $("#form").attr("action", "/group-fabric-color/store");

//     // Clear previous color inputs and add one default input
//     $('.color-container').empty();
//     addColorInput();
// }
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip();
// });
