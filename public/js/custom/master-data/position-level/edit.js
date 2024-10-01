"use strict";

// Class definition
var KTPositionLevelsEditPositionLevel = function () {
    // Shared variables
    const element = document.getElementById('kt_modal_edit_position_level');
    const form = element.querySelector('#kt_modal_edit_position_level_form');
    const modal = new bootstrap.Modal(element);

    // Init edit schedule modal
    var initEditPositionLevel = () => {

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'code_position_level': {
                        validators: {
                            notEmpty: {
                                message: 'Code Position Level Wajib Diisi.'
                            }
                        }
                    },
                    'nama_position_level': {
                        validators: {
                            notEmpty: {
                                message: 'Nama Position Level Wajib Diisi.'
                            }
                        }
                    },
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Submit button handler
        const submitButton = element.querySelector('[data-kt-position-level-modal-action="submit"]');
        submitButton.addEventListener('click', e => {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    console.log(status);

                    if (status == 'Valid') {
                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple click
                        submitButton.disabled = true;

                        // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        setTimeout(function () {
                            // Remove loading indication
                            submitButton.removeAttribute('data-kt-indicator');

                            // Enable button
                            submitButton.disabled = false;

                            // Show popup confirmation
                            Swal.fire({
                                text: "Forms pengisian berhasil diproses!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, lanjutkan!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    modal.hide();
                                }
                            });

                            form.submit(); // Submit form
                        }, 2000);
                    } else {
                        // Show popup warning. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            text: "Mohon maaf, sepertinya terdapat kesalahan, silahkan coba lagi.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, lanjutkan!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            }
        });

        // Cancel button handler
        const cancelButton = element.querySelector('[data-kt-position-level-modal-action="cancel"]');
        cancelButton.addEventListener('click', e => {
            e.preventDefault();

            Swal.fire({
                text: "Apakah anda yakin akan membatalkan?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Ya, batalkan!",
                cancelButtonText: "Tidak, kembali",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form
                    modal.hide();
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Form pengisian anda berhasil dibatalkan!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, lanjutkan!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        });

        // Close button handler
        const closeButton = element.querySelector('[data-kt-position-level-modal-action="close"]');
        closeButton.addEventListener('click', e => {
            e.preventDefault();

            Swal.fire({
                text: "Apakah anda yakin akan membatalkan?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Ya, batalkan!",
                cancelButtonText: "Tidak, kembali",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form
                    modal.hide();
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Form pengisian berhasil dikembalikan!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, lanjutkan!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        });
    }

    return {
        // Public functions
        init: function () {
            initEditPositionLevel();
        }
    };
}();

$('body').on('click', '.viewPositionLevel', function (e) {
    e.preventDefault();
    let dataTarget = e.target;

    routeViewPositionLevel = routeViewPositionLevel.replace(':id', dataTarget.getAttribute('data-id'));
    $.ajax({
        url: routeViewPositionLevel,
        dataType: 'json',
        success: function (resp) {
            let data_value = resp.data,
                tablePositionLevel;

                tablePositionLevel = viewPositionLevel(data_value);

            $('#dataPositionLevel').html(tablePositionLevel);
            $('#kt_modal_edit_position_level').modal('show');
        },
        error: function (err) {
            console.log("Error : ", err);
        }
    });

    routeViewPositionLevel = routeConstViewPositionLevel; // * Untuk reset route view
});

function viewPositionLevel(data) {
    let tablePositionLevel;

    tablePositionLevel = `<div class="fv-row mb-7">
                            <label class="required fs-6 fw-semibold mb-2">Code Position Level</label>
                            <input type="hidden" name="id_value" value="${data.id}">
                            <input type="text" class="form-control form-control-solid" placeholder="" name="code_position_level" value="${data.code_position_level}" readonly />
                        </div>
                        <div class="fv-row mb-7">
                            <label class="required fs-6 fw-semibold mb-2">Nama Position Level</label>
                            <input type="text" class="form-control" placeholder="" name="nama_position_level" value="${data.nama_position_level}" />
                        </div>`;

    return tablePositionLevel;
}

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTPositionLevelsEditPositionLevel.init();
});
