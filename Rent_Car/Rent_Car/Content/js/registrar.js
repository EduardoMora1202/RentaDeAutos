$(document).ready(function () {
    $('#FormularioCrearCuenta').submit(function (event) {
        event.preventDefault();

        var Identificacion = $('#CrearUserIdentificacion').val();
        var Nombre = $('#CrearuserNombre').val();
        var Direccion = $('#CrearuserDireccion').val();
        var Telefono = $('#CrearuserTelefono').val();
        var tipoCliente = $('#CrearusertipoCliente').val();
        var Contrasena = $('#CrearuserContrasena').val();

        if (tipoCliente === "Nacional") {
            IdTipoCliente = "1";
        }
        else {
            IdTipoCliente = "2";
        }
        $.ajax({
            url: 'http://localhost:4000/CrearClientes',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                Identificacion: Identificacion, Nombre: Nombre, Contrasena: Contrasena, IdTipoCliente: IdTipoCliente,
                Telefono: Telefono, Direccion: Direccion
            }),
            success: function (response) {
                // Si la validación del cliente es exitosa, enviar el correo electrónico de verificación
                if (response.success) {
                    console.log(response);
                    alert("Creacion de cliente correcto");
                    //window.location.href = "/Home/IngresarPreguntasyRespuestas";
                } else {
                    // Si hay un error en la validación del cliente, mostrar un mensaje de error
                    alert("Identificacion o Contraseña Incorrectas.");
                }
            },
            error: function (error) {
                // Manejar el error
                console.error("Error en la solicitud AJAX:", error);
                alert("Hubo un error al enviar la solicitud.");
            }
        });
    });
});