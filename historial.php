<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Historial de Solicitudes | ADQUISICIONES</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="assets/css/estilo.css" rel="stylesheet">
</head>
<body>

<div class="container-fluid">
    <div class="row">

        <!-- Sidebar -->
        <aside class="col-12 col-md-3 col-lg-2 sidebar">
            <div class="brand mb-4">
                <h5>ADQUISICIONES</h5>
            </div>
            <nav class="nav flex-column">
                <a class="nav-link" href="index.php">🛒 Nueva Solicitud</a>
                <a class="nav-link active" href="historial.php">🕘 Historial</a>
            </nav>
        </aside>

        <!-- Contenido -->
        <main class="col-12 col-md-9 col-lg-10 p-0">
            <div class="topbar d-flex justify-content-between align-items-center">
                <h6 class="mb-0 fw-bold">Historial de Solicitudes</h6>
            </div>

            <div class="p-4">

                <div id="alerta" class="alert d-none" role="alert"></div>

                <div class="seccion-card">
                    <div class="table-responsive">
                        <table class="table tabla-historial">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Proveedor</th>
                                    <th>Producto</th>
                                    <th>Cant.</th>
                                    <th>Subtotal</th>
                                    <th>Entrega</th>
                                    <th>Prioridad</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="cuerpo-tabla">
                                <!-- Las filas se llenan con jQuery/AJAX desde api/listar.php -->
                            </tbody>
                        </table>
                        <p id="sin-datos" class="text-muted text-center py-4 d-none">Todavía no hay solicitudes registradas.</p>
                    </div>
                </div>

            </div>
        </main>

    </div>
</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="assets/js/historial.js"></script>
</body>
</html>
