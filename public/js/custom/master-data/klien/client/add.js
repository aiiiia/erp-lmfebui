"use strict";

// Class definition
var KTUsersAddClient = function () {
    // Shared variables
    const element = document.getElementById('kt_modal_add_client');
    const form = element.querySelector('#kt_modal_add_client_form');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    var initAddClient = () => {

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'initial': {
                        validators: {
                            notEmpty: {
                                message: 'Initial Client Wajib Diisi.'
                            }
                        }
                    },
                    'nama': {
                        validators: {
                            notEmpty: {
                                message: 'Nama Client Wajib Diisi.'
                            }
                        }
                    },
                    'id_jenis': {
                        validators: {
                            notEmpty: {
                                message: 'Jenis Instansi Wajib Diisi.'
                            }
                        }
                    },
                    'id_lokasi': {
                        validators: {
                            notEmpty: {
                                message: 'Lokasi Client Wajib Diisi.'
                            }
                        }
                    },
                    'id_sumber_dana': {
                        validators: {
                            notEmpty: {
                                message: 'Sumber Dana Wajib Diisi.'
                            }
                        }
                    },
                    'alamat': {
                        validators: {
                            notEmpty: {
                                message: 'Alamat Client Wajib Diisi.'
                            }
                        }
                    },
                    'no_hp': {
                        validators: {
                            notEmpty: {
                                message: 'No Telepon Client Wajib Diisi.'
                            }
                        }
                    },
                    'no_npwp': {
                        validators: {
                            notEmpty: {
                                message: 'No NPWP Client Wajib Diisi.'
                            }
                        }
                    },
                    'status_wapu': {
                        validators: {
                            notEmpty: {
                                message: 'Status WAPU Wajib Diisi.'
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
        const submitButton = element.querySelector('[data-kt-client-modal-action="submit"]');
        submitButton.addEventListener('click', e => {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
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
        const cancelButton = element.querySelector('[data-kt-client-modal-action="cancel"]');
        cancelButton.addEventListener('click', e => {

            console.log("masuk");
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
        const closeButton = element.querySelector('[data-kt-client-modal-action="close"]');
        closeButton.addEventListener('click', e => {
            console.log("test");
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
            initAddClient();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUsersAddClient.init();
});
