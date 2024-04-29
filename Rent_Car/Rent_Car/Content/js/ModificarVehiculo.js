$(document).ready(function () {
    $('#formularioModificar').submit(function (event) {
        event.preventDefault();

        var Modelo = $('#Modelo').val();
        var Color = $('#Color').val();
        var Placa = $('#Placa').val();
        var vehiculoId = obtenerParametroId();
        console.log(vehiculoId);
        console.log(Modelo);
        console.log(Color);
        console.log(Placa);

        $.ajax({
            url: 'http://localhost:4000/ModificarVehiculo/' + vehiculoId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ Modelo: Modelo, Color: Color, Placa: Placa }),
            success: function (response) {
                alert("Vehículo modificado correctamente.");
                window.location.href = "/Admin/VerVehiculosAdmin";
            },
            error: function (error) {
                console.error("Error en la solicitud AJAX:", error);
                alert("Hubo un error al modificar el vehículo.");
            }
        });
    });

    // Función para obtener el ID del vehículo de la URL
    function obtenerParametroId() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
});