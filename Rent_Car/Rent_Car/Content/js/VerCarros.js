$(document).ready(function () {
    // Función para manejar el clic en el botón "Detalles"
    $(document).on("click", ".detalle-btn", function () {
        // Obtener el ID del auto seleccionado
        var autoId = $(this).data("id");

        // Realizar una solicitud AJAX para obtener los detalles del auto
        $.ajax({
            url: 'http://localhost:4000/vehiculoDetallesID/' + autoId,
            type: 'GET',
            success: function (data) {
                //window.location.href = "/Home/VerDetallesAutos?id=" + autoId;
                window.location.href = "/Home/VerDetallesAutos";
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener detalles del vehículo:", error);
            }
        });
    });

    // Tu código AJAX para cargar la lista de autos
    $.ajax({
        url: 'http://localhost:4000/VerVehiculos',
        type: 'GET',
        success: function (data) {
            var container = $('#idDeTuSelect');

            // Verificar si se recibieron datos
            if (data && data.length > 0) {
                // Iterar sobre cada elemento en los datos
                data.forEach(function (auto) {
                    // Construir el HTML para cada auto
                    var carHtml = `
                        <div class="col-md-4">
                            <div class="car-wrap rounded">
                                <div class="img rounded d-flex align-items-end" style="background-image: url('/Content/images/car-2.jpg');">
                                </div>
                                <div class="text">
                                    <h2 class="mb-0"><a href="#">${auto.Modelo}</a></h2>
                                    <div class="d-flex mb-3">
                                        <span  class="cat">${auto.Marca}</span>
                                        <p class="price ml-auto">$${auto.PrecioAlquilerDia} <span>/Dia</span></p>
                                    </div>
                                    <p class="d-flex mb-0 d-block">
                                        <a href="#" class="btn btn-primary py-2 mr-1">Reservar</a> 
                                        <button class="btn btn-secondary py-2 ml-1 detalle-btn" data-id="${auto.Id}">Detalles</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                    // Agregar el HTML del auto al contenedor
                    container.append(carHtml);
                });
            } else {
                // Si no se recibieron datos, mostrar un mensaje de error o manejar de otra forma
                console.log("No se encontraron vehículos.");
            }
        },
        error: function (xhr, status, error) {
            // Manejar errores de la solicitud AJAX
            console.error("Error al obtener datos:", error);
        }
    });
});
