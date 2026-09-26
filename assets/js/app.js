$(document).ready(function () {

    // --- Calcular el subtotal en vivo mientras el usuario escribe ---
    function calcularSubtotal() {
        const cantidad = parseFloat($('#cantidad').val()) || 0;
        const precio = parseFloat($('#precio_unitario').val()) || 0;
        const subtotal = cantidad * precio;
        $('#subtotal-estimado').val('$ ' + subtotal.toFixed(2));
    }

    $('#cantidad, #precio_unitario').on('input', calcularSubtotal);

    // --- Mostrar un mensaje de alerta reutilizable ---
    function mostrarAlerta(mensaje, tipo) {
        $('#alerta')
            .removeClass('d-none alert-success alert-danger')
            .addClass('alert-' + tipo)
            .text(mensaje);
    }

    // --- Enviar el formulario por AJAX, sin recargar la página ---
    $('#formSolicitud').on('submit', function (e) {
        e.preventDefault(); // evita que el formulario recargue la página

        const datos = $(this).serialize(); // convierte todos los campos en una cadena

        $.ajax({
            url: 'api/guardar.php',
            method: 'POST',
            data: datos,
            dataType: 'json',
            success: function (respuesta) {
                if (respuesta.ok) {
                    mostrarAlerta('Solicitud registrada correctamente (folio #' + respuesta.id + ').', 'success');
                    $('#formSolicitud')[0].reset();
                    $('#subtotal-estimado').val('$ 0.00');
                } else {
                    mostrarAlerta(respuesta.error || 'Ocurrió un error al registrar.', 'danger');
                }
            },
            error: function (xhr) {
                const respuesta = xhr.responseJSON;
                mostrarAlerta(respuesta && respuesta.error ? respuesta.error : 'Error de conexión con el servidor.', 'danger');
            }
        });
    });

});
