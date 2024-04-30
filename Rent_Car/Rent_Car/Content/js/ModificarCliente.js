$(document).ready(function () {
    $('#formularioModificar').submit(function (event) {
        event.preventDefault();

        var Identificacion = $('#Identificacion').val();
        var TipoCliente = $('#TipoCliente').val();
        var Nombre = $('#Nombre').val();
        var Contrasena = $('#Contrasena').val();
        var Telefono = $('#Telefono').val();
        var Direccion = $('#Direccion').val();
        var ClienteId = obtenerParametroId();
        console.log(ClienteId);
        console.log(Identificacion);
        console.log(TipoCliente);
        console.log(Contrasena);
        console.log(Telefono);
        console.log(Direccion);

        $.ajax({
            url: 'http://localhost:4000/ModificarCliente/' + ClienteId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ Identificacion: Identificacion, Nombre: Nombre, Contrasena: Contrasena, Telefono: Telefono, Direccion: Direccion, TipoCliente }),
            success: function (response) {
                alert("Cliente modificado correctamente.");
                window.location.href = "/Admin/VerVehiculosAdmin";
            },
            error: function (error) {
                console.error("Error en la solicitud AJAX:", error);
                alert("Hubo un error al modificar el cliente.");
            }
        });
    });

    // Función para obtener el ID del vehículo de la URL
    function obtenerParametroId() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
});