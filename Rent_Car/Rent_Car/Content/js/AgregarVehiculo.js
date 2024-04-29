$(document).ready(function () {
    $('#FormularioAgregarVehiculo').submit(function (event) {
        event.preventDefault();

        var Marca = $('#Marca').val();
        var Placa = $('#Placa').val();
        var Modelo = $('#Modelo').val();
        var CapaPasajeros = $('#CapaPasajeros').val();
        var Color = $('#Color').val();
        var Precio = $('#Precio').val();
        var AgregarAutoTipoVehiculo = $('#AgregarAutoTipoVehiculo').val();
        var AgregarAutoTipoConbustible = $('#AgregarAutoTipoConbustible').val();

        switch (AgregarAutoTipoVehiculo) {
            case "Automovil":
                IdTipoVehiculo = "1";
                break;
            case "Moto":
                IdTipoVehiculo = "2";
                break;
            case "Camión":
                IdTipoVehiculo = "3";
                break;
            case "Buseta":
                IdTipoVehiculo = "4";
                break;
            default:
                alert("Tipo de vehiculo no valido");
                break;
        }

        switch (AgregarAutoTipoConbustible) {
            case "Diesel":
                IdTipoCombustible = "1";
                break;
            case "Gasolina":
                IdTipoCombustible = "2";
                break;
            case "Hibrido":
                IdTipoCombustible = "3";
                break;
            case "Eléctrico":
                IdTipoCombustible = "4";
                break;
            default:
                alert("Tipo de combustible no valido");
                break;
        }

        $.ajax({
            url: 'http://localhost:4000/AgregarNuevoVehiculo',
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