export const queries = {
  GetAllAutos: `SELECT V.*, M.Marca FROM Vehiculos V JOIN Tipo_Marca M ON V.idMarca = M.Id WHERE V.Disponiblidad = 1;`,

  GetCrearNuevoCliente:
    "INSERT INTO Cliente (Identificacion, Nombre, Contrasena, IdTipoCliente, Telefono, Direccion, TipoUsuario) VALUES (@Identificacion, @Nombre, @Contrasena, @IdTipoCliente, @Telefono, @Direccion, @TipoUsuario)",

  GetInicoSesion:
    "SELECT Id, TipoUsuario FROM Cliente WHERE Identificacion = @Identificacion AND Contrasena = @Contrasena",

  GetDetallesVehiculoById:
    "SELECT V.*, M.Marca, TV.Tipo_Carro AS TipoVehiculo, TC.Tipo_Combustible AS TipoCombustible FROM Vehiculos V JOIN Tipo_Marca M ON V.idMarca = M.Id JOIN Tipo_Vehiculo TV ON V.idTipo_Vehiculo = TV.Id JOIN Tipo_Combustible TC ON V.IdTipoCombustible = TC.Id WHERE V.Id = @id;",

    PutTarjetaCredito: `INSERT INTO Tarjeta_Credito (Numero_Tarjeta, IdTipo_Tarjeta, Fecha_Vencimiento, Nombre_Titular) VALUES (@Numero_Tarjeta, @Tipo_Tarjeta, @Fecha_Vencimiento, @Nombre_Titular);`,

    PutAlquiler: `INSERT INTO Arquileres (IdClientes, IdVehiculos, Fecha_Inicio, Fecha_Fin, Precio_Total, Seguro_Vehiculo, CodigoReserva) VALUES (@IdClientes, @IdVehiculos, @Fecha_Inicio, @Fecha_Fin, @Precio_Total, @Seguro_Vehiculo,@CodigoReserva);`,

  /*Administador */
  GetVerVehiculos: `
  SELECT 
  V.Id AS VehiculoId,
  TM.Marca AS Marca,
  V.Modelo,
  TV.Tipo_Carro AS TipoVehiculo,
  V.Color,
  V.Placa,
  V.Capacidad_Pasajeros,
  V.PrecioAlquilerDia,
  TC.Tipo_Combustible AS TipoCombustible,
  V.Disponiblidad
FROM 
  Vehiculos V
JOIN 
  Tipo_Marca TM ON V.idMarca = TM.Id
JOIN 
  Tipo_Vehiculo TV ON V.idTipo_Vehiculo = TV.Id
JOIN 
  Tipo_Combustible TC ON V.IdTipoCombustible = TC.Id;
`,

  GetAgregarNuevoVehiculo:
    "INSERT INTO Vehiculos (IdMarca, Modelo, idTipo_Vehiculo, Color, Placa, Capacidad_Pasajeros, PrecioAlquilerDia,Disponiblidad,IdTipoCombustible) VALUES (@IdMarca, @Modelo,@idTipo_Vehiculo, @Color, @Placa, @Capacidad_Pasajeros, @PrecioAlquilerDia,@Disponiblidad,@IdTipoCombustible)",

  DeleteVehiculos: "DELETE FROM Vehiculos WHERE Id = @id",

  updateVehiculo:
    "UPDATE Vehiculos SET Modelo = @Modelo, Color = @Color, Placa = @Placa WHERE Id = @id",

  /*Cliente */
  GetVerClintes: `SELECT 
  c.Id AS ClienteId,
  c.Identificacion,
  c.Nombre,
  c.Telefono,
  c.Direccion,
  tc.TipoCliente AS TipoCliente
FROM 
  Cliente c
JOIN 
  Tipo_Cliente tc ON c.IdTipoCliente = tc.Id;`,

  DeleteClientes: "DELETE FROM Cliente WHERE Id = @id",

  ModificarCliente:
    "UPDATE Cliente SET Identificacion = @Identificacion, Nombre = @Nombre, Contrasena = @Contrasena, IdTipoCliente = @IdTipoCliente, Telefono = @Telefono, Direccion = @Direccion WHERE Id = @id",
};
