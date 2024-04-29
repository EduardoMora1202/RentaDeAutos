$(document).ready(function () {
    // Función para cargar los datos de los vehículos
    function cargarDatos() {
        $.ajax({
            url: "http://localhost:4000/GetVerAutosTablas",
            type: "GET",
            success: function (response) {
                // Limpiar el cuerpo de la tabla
                $("#cuerpoTabla").empty();

                // Iterar sobre los datos y agregar filas a la tabla
                response.forEach(function (auto) {
                    $("#cuerpoTabla").append(`
              <tr>
                <td>${auto.VehiculoId}</td>
                <td>${auto.Marca}</td>
                <td>${auto.Modelo}</td>
                <td>${auto.TipoVehiculo}</td>
                <td>${auto.Color}</td>
                <td>${auto.Placa}</td>
                <td>${auto.Capacidad_Pasajeros}</td>
                <td>${auto.PrecioAlquilerDia}</td>
                <td>${auto.TipoCombustible}</td>
                <td>${auto.Disponiblidad}</td>
                <td>
                    <button class="eliminarBtn" data-id="${auto.VehiculoId}">Eliminar</button>
                    <button class="modificarBtn" data-id="${auto.VehiculoId}">Modificar</button>
                </td> 
              </tr>
            `);
                });
            },
            error: function (error) {
                console.error("Error en la solicitud AJAX:", error);
                alert("Hubo un error al cargar los datos.");
            },
        });
    }

    // Cargar los datos al cargar la página
    cargarDatos();

    // Función para eliminar un vehículo
    $(document).on("click", ".eliminarBtn", function () {
        var vehiculoId = $(this).data("id");
        if (confirm("¿Estás seguro de que quieres eliminar este vehículo?")) {
            $.ajax({
                url: "http://localhost:4000/EliminarVehuculos/" + vehiculoId,
                type: "DELETE",
                success: function (response) {
                    alert("Vehículo eliminado correctamente.");
                    // Volver a cargar los datos después de eliminar
                    cargarDatos();
                },
                error: function (error) {
                    console.error("Error en la solicitud AJAX:", error);
                    alert("Hubo un error al eliminar el vehículo.");
                },
            });
        }
    });

    $(document).on("click", ".modificarBtn", function () {
        var vehiculoId = $(this).data("id");
        window.location.href = "/Admin/ModificarInfoVehiculo?id=" + vehiculoId;
    });
});
