var drOptions = {
    // สามารถใส่ options ถ้าต้องการ
    messages: {
        default: "Drag and drop a file here or click",
        replace: "Drag and drop or click to replace",
        remove: "Remove",
        error: "Ooops, something wrong appended.",
    },
};
var drEvent = $(".dropify").dropify(drOptions);
drEvent.on("change", function (event, element) {
    var input = event.target;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Clear all inline styles and reset content
            $(".dropify-preview .dropify-font-file").attr("style", "").html("");

            // Remove ::before pseudo-element by adding a class to override it
            $(".dropify-preview .dropify-font-file").css("display", "none");
            $(".dropify-preview .dropify-extension").css("display", "none");

            // Replace with uploaded SVG and center it
            $(".dropify-preview")
                .css({
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "center",
                })
                .removeClass("has-error");

            // Add a new div inside dropify-preview
            $(".dropify-preview .dropify-render").html(
                '<div class="custom-container" style="width: 100px; height: 100px; "><img src="' +
                    e.target.result +
                    '" alt="Uploaded SVG" style="width: 100px; height: 100px; display: block; margin: auto;" /></div>'
            );
        };

        reader.readAsDataURL(input.files[0]);
    }
});

$.validator.addMethod(
    "filesize",
    function (value, element, param) {
        // param in bytes
        if (element.files.length === 0) return true; // let required handle empty
        return element.files[0].size <= param;
    },
    "File size must be less than {0} bytes."
);

// Optional: more user-friendly filesize message formatter
function bytesToMB(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

$(document).ready(function () {
    $("#form").validate({
        ignore: ".ignore",
        rules: {
            name: {
                required: true,
            },
            file: {
                required: function() {
                    if ($("#form").attr("action").includes("create")) {
                        return true;
                    }
                    return false;
                },
                // extension: "png|jpg|jpeg|svg",
                filesize: 2 * 1024 * 1024, // 2 MB in bytes
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

function addData() {
    $("#modal-default").modal("show");
    $(".modal-title").text("Add Pattern");
    $("button[type=submit] .btn-text").text("Create");
    $("#form")[0].reset();
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#form").attr("action", "/pattern/create");
}

function deleteData(id) {
    // swal delete
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
                url: `/pattern/destroy/${id}`,
                type: "POST",
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
            });
        }
    });
}

function editData(id) {
    $("#modal-default").modal("show");
    $(".modal-title").text("Edit Pattern");
    $("button[type=submit] .btn-text").text("Update");
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").remove();
    $("#form").attr("action", `/pattern/update/${id}`);
    $.ajax({
        url: `/pattern/edit/${id}`,
        type: "GET",
        success: function (response) {
            console.log(response);
            $("#name").val(response.data.name);
        },
    });
}
