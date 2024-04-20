$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);
    var autoId = urlParams.get('id');

    $.ajax({

        url: 'http://localhost:4000/vehiculoDetallesID/' + autoId,
        type: 'GET',
        success: function (data) {
            //console.log(data);
            console.log(data.TipoCombustible);
            $("#marca").text(data.Marca);
            $("#modelo").text(data.Modelo);
            $("#Capacidad_Pasajeros").text(data.Capacidad_Pasajeros);
            $("#Capacidad_Maletero").text(data.Capacidad_Maletero);
            $("#precio").text(data.PrecioAlquilerDia);
            $("#TipoCombustible").text(data.TipoCombustible);
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener detalles del vehículo:", error);
        }
    });

});