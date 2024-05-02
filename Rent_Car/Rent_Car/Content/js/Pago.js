var Seguro_Vehiculo1 = 0;
var Precio_Total1 = 0;
$(document).ready(function () {

    var precio = obtenerParametroPrecio();
    mostrarPrecio(precio);
    
    $('#FormularioReservaAuto').submit(function (event) {

        event.preventDefault();

        var Tipo_Tarjeta = $('#ReservartipoTarjeta').val();
        var Nombre_Titular = $('#Nombretarjeta').val();
        var Numero_Tarjeta = $('#Numerotarjeta').val();
        var Fecha_Vencimiento = $('#FechaCadicidad').val();
        var Seguro_Vehiculo = Seguro_Vehiculo1;
        var Precio_Total = Precio_Total1;
        var AutoId = obtenerParametroId();

        console.log("Tarje",Tipo_Tarjeta);
        console.log(Nombre_Titular);
        console.log(Numero_Tarjeta);
        console.log("Fecha",Fecha_Vencimiento);
        console.log(Seguro_Vehiculo);
        console.log(Precio_Total);
        console.log("id",AutoId);

        alert("Probar")


        $.ajax({
            url: 'http://localhost:4000/ReservarAuto/' + AutoId,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ Numero_Tarjeta: Numero_Tarjeta, Tipo_Tarjeta: Tipo_Tarjeta, Fecha_Vencimiento: Fecha_Vencimiento, Nombre_Titular: Nombre_Titular, Precio_Total: Precio_Total, Seguro_Vehiculo: Seguro_Vehiculo }),
            success: function (response) {
                alert("Cliente modificado correctamente.");
                window.location.href = "/Admin/VerVehiculosAdmin";
            },
            error: function (error) {
                alert("Hubo un error al modificar el cliente.");
            }
        });
    });


    function obtenerParametroId() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }
    function obtenerParametroPrecio() {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('precio');
    }
    function mostrarPrecio(precio) {
        var alquilerLabel = document.getElementById("alquilerLabel");
        var TotalPrecioLabel = document.getElementById("TotalPagar");

        alquilerLabel.textContent = "$" + precio;
        TotalPrecioLabel.textContent = "$" + precio;

    }

});
function addPrice() {
    const precioSeguro = 500;
    var precio = obtenerParametroPrecio();

    const total = parseInt(precio) + precioSeguro;


    var seguroPrecioLabel = document.getElementById("seguro-precio");
    var TotalPrecioLabel = document.getElementById("TotalPagar");
    var seguroRadioButton = document.getElementById("dot-1");
    var DosseguroRadioButton = document.getElementById("dot-2");

    if (seguroRadioButton.checked) {
        seguroPrecioLabel.textContent = "$" + precioSeguro ;
        TotalPrecioLabel.textContent = "$" + total;
        Precio_Total1 = total;
        Seguro_Vehiculo1 = 1;

    } else if (DosseguroRadioButton.checked) {
        seguroPrecioLabel.textContent = "0.0";
        TotalPrecioLabel.textContent = "$" + precio;
        Precio_Total1 = precio;  
        Seguro_Vehiculo1 = 0;


    }
}
function obtenerParametroPrecio() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('precio');
}


