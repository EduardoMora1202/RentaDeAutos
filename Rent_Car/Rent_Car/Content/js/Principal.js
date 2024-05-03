$(document).ready(function () {
    $('#formularioReserveDia').submit(function (event) {
        event.preventDefault();

        var FechaRecoger = $('#FechaRecoger').val();
        var FechaEntrega = $('#FechaEntrega').val();
        $.ajax({
            type: "POST",
            url: 'http://localhost:4000/ReserveDia',
            contentType: "application/json",
            data: JSON.stringify({ FechaRecoger: FechaRecoger, FechaEntrega: FechaEntrega }), 
            success: function (response) {
                if (response.success) {
                    window.location.href = "/Home/VerAutosAlquilado";
                } else {
                    // Si hay un error en la validación del cliente, mostrar un mensaje de error
                    alert("Se ha producido un error.");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error en la solicitud AJAX:", jqXHR.responseText);
                alert("Hubo un error al enviar la solicitud.");
            }
        });
    });
});
