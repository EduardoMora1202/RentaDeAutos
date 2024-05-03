$(document).ready(function () {

    var codigoReserva = obtenerParametroCodigo();
    $("#CodigoReserva").text(codigoReserva);

    function obtenerParametroCodigo() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('CodigoReserva');
    }

});