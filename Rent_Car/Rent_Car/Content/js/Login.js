$(document).ready(function () {
    $('#FormularioInicarSesion').submit(function (event) {
        event.preventDefault();

        var Identificacion = $('#IniUserIdentificacion').val();
        var Contrasena = $('#iniUserContrasena').val();

        alert("Identificacion", Identificacion,"Contrasena",Contrasena);
        console.log("Identificacion", Identificacion,"Contrasena",Contrasena);
        $.ajax({
            type: "POST",
            url: 'http://localhost:4000/ValidarCliente',
            contentType: "application/json",
            data: JSON.stringify({ Identificacion: Identificacion, Contrasena: Contrasena }), // Cambia "cedula" a "Cedula"
            success: function (response) {
                // Si la validación del cliente es exitosa, enviar el correo electrónico de verificación
                if (response.success) {
                    console.log(response);
                    alert("Inicio de Sesion Exitoso");
                    //window.location.href = "/Home/CodigoVerificacionLogin";
                } else {
                    // Si hay un error en la validación del cliente, mostrar un mensaje de error
                    alert("Identificacion o Contraseña Incorrectas.");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX:", jqXHR.responseText);
                alert("Hubo un error al enviar la solicitud.");
            }
        });
    });
});