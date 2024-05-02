$(document).ready(function () {
    $('#formularioReserveDia').submit(function (event) {
        event.preventDefault();

        var FechaRecoger = $('#FechaRecoger').val();
        var FechaEntrega = $('#FechaEntrega').val();
        alert
        $.ajax({
            type: "POST",
            url: 'http://localhost:4000/ReserveDia',
            contentType: "application/json",
            data: JSON.stringify({ FechaRecoger: FechaRecoger, FechaEntrega: FechaEntrega }), // Cambia "cedula" a "Cedula"
            success: function (response) {
                if (response.success) {
                    console.log(response);
                    alert("Identificacion o Contraseña Incorrectas.");

                    window.location.href = "/Home/VerAutosAlquilado";
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
