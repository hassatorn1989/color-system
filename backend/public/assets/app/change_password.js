$('#form_change_password').validate({
    ignore: ".ignore",
    rules: {
        current_password: {
            required: true,
            remote: {
                url: '/check-current-password',
                type: 'POST',
                data:
                {
                    current_password: function () {
                        return $('input[name="current_password"]').val();
                    }
                },
                dataFilter: function (response) {
                    var json = JSON.parse(response);
                    return json.isMatch === true;
                },
            }
        },
        new_password: {
            required: true
        },
        confirm_password: {
            required: true,
            equalTo: "#new_password"
        },
    },
    messages: {
        current_password: {
            remote: 'รหัสผ่านปัจจุบันไม่ถูกต้อง',
        },
        confirm_password: {
            equalTo: 'ยึนยันรหัสผ่านใหม่ไม่ถูกต้อง'
        },
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
    },
    submitHandler: function (form) {
        $('#btn_save_chang_password').empty().html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Saving...').attr('disabled', true);
        form.submit();
    }
});


function changePassword() {
    // Clear form fields
    $('#form_change_password')[0].reset();
    $('#form_change_password').find('.is-invalid').removeClass('is-invalid');
}
