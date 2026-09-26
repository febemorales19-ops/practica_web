$(document).ready(function () {

    function mostrarAlerta(mensaje, tipo) {
        $('#alerta')
            .removeClass('d-none alert-success alert-danger')
            .addClass('alert-' + tipo)
            .text(mensaje);
    }

    // --- Cargar todas las solicitudes desde el servidor ---
    function cargarSolicitudes() {
        $.getJSON('api/listar.php', function (respuesta) {
            const filas = respuesta.data;
            $('#cuerpo-tabla').empty();

            if (filas.length === 0) {
                $('#sin-datos').removeClass('d-none');
                return;
            }
            $('#sin-datos').addClass('d-none');

            // Por cada solicitud, construimos una fila de tabla y la agregamos
            filas.forEach(function (item) {
                const fila = `
                    <tr data-id="${item.id}">
                        <td>${item.id}</td>
                        <td>${item.proveedor}</td>
                        <td>${item.producto}</td>
                        <td>${item.cantidad}</td>
                        <td>$${parseFloat(item.subtotal).toFixed(2)}</td>
                        <td>${item.fecha_entrega ?? '—'}</td>
                        <td>${item.prioridad ?? '—'}</td>
                        <td><button class="btn btn-eliminar btn-sm" data-id="${item.id}">Eliminar</button></td>
                    </tr>`;
                $('#cuerpo-tabla').append(fila);
            });
        });
    }

    cargarSolicitudes();

    // --- Eliminar una solicitud (delegado, porque las filas se crean dinámicamente) ---
    $('#cuerpo-tabla').on('click', '.btn-eliminar', function () {
        const id = $(this).data('id');
        const fila = $(this).closest('tr');

        if (!confirm('¿Seguro que quieres eliminar la solicitud #' + id + '?')) {
            return;
        }

        $.ajax({
            url: 'api/eliminar.php',
            method: 'POST',
            data: { id: id },
            dataType: 'json',
            success: function (respuesta) {
                if (respuesta.ok) {
                    fila.fadeOut(200, function () { $(this).remove(); });
                    mostrarAlerta('Solicitud #' + id + ' eliminada.', 'success');
                } else {
                    mostrarAlerta(respuesta.error || 'No se pudo eliminar.', 'danger');
                }
            },
            error: function () {
                mostrarAlerta('Error de conexión con el servidor.', 'danger');
            }
        });
    });

});
