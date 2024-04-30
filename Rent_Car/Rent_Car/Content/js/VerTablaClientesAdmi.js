$(document).ready(function () {
    // Función para cargar los datos de los vehículos
    function cargarDatos() {
        $.ajax({
            url: "http://localhost:4000/GetVerClienteTablas",
            type: "GET",
            success: function (response) {
                // Limpiar el cuerpo de la tabla
                $("#cuerpoTabla").empty();

                response.forEach(function (auto) {
                    $("#cuerpoTabla").append(`
              <tr>
                <td>${auto.ClienteId}</td>
                <td>${auto.Identificacion}</td>
                <td>${auto.Nombre}</td>
                <td>${auto.Contrasena}</td>
                <td>${auto.Telefono}</td>
                <td>${auto.Direccion}</td>
                <td>${auto.TipoCliente}</td>
      
                <td>
                    <button class="eliminarBtn" data-id="${auto.ClienteId}">Eliminar</button>
                    <button class="modificarBtn" data-id="${auto.ClienteId}">Modificar</button>
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
        var ClienteId = $(this).data("id");
        if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
            $.ajax({
                url: "http://localhost:4000/EliminarCliente/" + ClienteId,
                type: "DELETE",
                success: function (response) {
                    alert("Cliente eliminado correctamente.");
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
        var ClienteId = $(this).data("id");
        window.location.href = "/Admin/ModificarInfoCliente?id=" + ClienteId;
    });
});
