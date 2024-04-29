$(document).ready(function () {
    $('#FormularioAgregarVehiculo').submit(function (event) {
        event.preventDefault();

        var IdMarca = $('#AgregarAutoMarca').val();
        var Placa = $('#Placa').val();
        var Modelo = $('#Modelo').val();
        var Capacidad_Pasajeros = $('#CapaPasajeros').val();
        var Color = $('#Color').val();
        var PrecioAlquilerDia = $('#Precio').val();
        var idTipo_Vehiculo = $('#AgregarAutoTipoVehiculo').val();
        var IdTipoCombustible = $('#AgregarAutoTipoConbustible').val();
        $.ajax({
            url: 'http://localhost:4000/AgregarNuevoVehiculo',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                IdMarca: IdMarca, Modelo: Modelo, idTipo_Vehiculo: idTipo_Vehiculo, Color: Color,
                Placa: Placa, Capacidad_Pasajeros: Capacidad_Pasajeros, PrecioAlquilerDia: PrecioAlquilerDia, IdTipoCombustible: IdTipoCombustible
            }),
            success: function (response) {
                // Si la validación del cliente es exitosa, enviar el correo electrónico de verificación
                if (response.success) {
                    console.log(response);
                    alert("Vehiculo Agregado Correcto");
                    $('#AgregarAutoMarca').val('');
                    $('#Placa').val('');
                    $('#Modelo').val('');
                    $('#CapaPasajeros').val('');
                    $('#Color').val('');
                    $('#Precio').val('');
                    $('#AgregarAutoTipoVehiculo').val('');
                    $('#AgregarAutoTipoConbustible').val('');
                } else {
                    // Si hay un error en la validación del cliente, mostrar un mensaje de error
                    alert("El Vehiculo No Se Ha Podido Agregar");
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