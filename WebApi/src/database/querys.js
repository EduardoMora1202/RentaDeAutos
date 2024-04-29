import { updateVehiculo } from "../controllers/AdminController";

export const queries = {
  GetAllAutos:
    "SELECT V.*, M.Marca FROM Vehiculos V JOIN Tipo_Marca M ON V.idMarca = M.Id WHERE V.Disponiblidad = 1;",

  GetCrearNuevoCliente:
    "INSERT INTO Cliente (Identificacion, Nombre, Contrasena, IdTipoCliente, Telefono, Direccion) VALUES (@Identificacion, @Nombre, @Contrasena, @IdTipoCliente, @Telefono, @Direccion)",

  GetInicoSesion:
    "SELECT * FROM Cliente WHERE Identificacion = @Identificacion AND Contrasena = @Contrasena",

  GetDetallesVehiculoById:
    "SELECT V.*, M.Marca, TV.Tipo_Carro AS TipoVehiculo, TC.Tipo_Combustible AS TipoCombustible FROM Vehiculos V JOIN Tipo_Marca M ON V.idMarca = M.Id JOIN Tipo_Vehiculo TV ON V.idTipo_Vehiculo = TV.Id JOIN Tipo_Combustible TC ON V.IdTipoCombustible = TC.Id WHERE V.Id = @id;",

  /*Administador */

  GetAgregarNuevoVehiculo:
    "INSERT INTO Vehiculos (IdMarca, Modelo, idTipo_Vehiculo, Color, Placa, Capacidad_Pasajeros, PrecioAlquilerDia,Disponiblidad,IdTipoCombustible) VALUES (@IdMarca, @Modelo,@idTipo_Vehiculo, @Color, @Placa, @Capacidad_Pasajeros, @PrecioAlquilerDia,@Disponiblidad,@IdTipoCombustible)",

  DeleteVehiculos: "DELETE FROM Vehiculos WHERE Id = @id",

  updateVehiculo:
    "UPDATE Vehiculos SET Modelo = @Modelo, Color = @Color, Placa = @Placa WHERE Id = @id",
};
