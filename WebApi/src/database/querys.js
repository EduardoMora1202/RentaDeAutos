export const queries ={
    GetAllAutos: "SELECT V.*, M.Marca FROM Vehiculos V JOIN Tipo_Marca M ON V.idMarca = M.Id WHERE V.Disponiblidad = 1;",

    GetCrearNuevoCliente: "INSERT INTO Cliente (Identificacion, Nombre, Contrasena, IdTipoCliente, Telefono, Direccion) VALUES (@Identificacion, @Nombre, @Contrasena, @IdTipoCliente, @Telefono, @Direccion)",

    GetInicoSesion: "SELECT * FROM Cliente WHERE Identificacion = @Identificacion AND Contrasena = @Contrasena",
    
    GetDetallesVehiculoById: "SELECT V.*, M.Marca, TV.Tipo_Carro AS TipoVehiculo, TC.Tipo_Combustible AS TipoCombustible FROM Vehiculos V JOIN Tipo_Marca M ON V.idMarca = M.Id JOIN Tipo_Vehiculo TV ON V.idTipo_Vehiculo = TV.Id JOIN Tipo_Combustible TC ON V.IdTipoCombustible = TC.Id WHERE V.Id = @id;",
    
    DeleteClientes: "DELETE FROM Cliente WHERE Id = @id",

    UpdateClientes: "UPDATE Cliente SET cedula = @cedula, nombre = @nombre, Correo = @Correo WHERE Id = @id",



    
};

