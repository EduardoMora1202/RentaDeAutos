import { getConnection, SQl, queries } from "../database/Index";

export const AgregarVehiculos = async (req, res) => {
  const {
    IdMarca,
    Modelo,
    idTipo_Vehiculo,
    Color,
    Placa,
    Capacidad_Pasajeros,
    PrecioAlquilerDia,
    IdTipoCombustible,
  } = req.body;
  if (
    !IdMarca ||
    !Modelo ||
    !idTipo_Vehiculo ||
    !Color ||
    !Placa ||
    !Capacidad_Pasajeros ||
    !PrecioAlquilerDia ||
    !IdTipoCombustible
  ) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }

  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input("IdMarca", SQl.Int, IdMarca);
    request.input("Modelo", SQl.VarChar, Modelo);
    request.input("idTipo_Vehiculo", SQl.Int, idTipo_Vehiculo);
    request.input("Color", SQl.VarChar, Color);
    request.input("Placa", SQl.VarChar, Placa);
    request.input("Capacidad_Pasajeros", SQl.VarChar, Capacidad_Pasajeros);
    request.input("PrecioAlquilerDia", SQl.Decimal, PrecioAlquilerDia);
    request.input("Disponiblidad", SQl.Bit, 1);
    request.input("IdTipoCombustible", SQl.Int, IdTipoCombustible);

    await request.query(queries.GetAgregarNuevoVehiculo);

    res.status(201).json({
      msg: "Vehiculo agregado correctamente",
      cliente: {
        IdMarca,
        Modelo,
        idTipo_Vehiculo,
        Color,
        Placa,
        Capacidad_Pasajeros,
        PrecioAlquilerDia,
        IdTipoCombustible,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

/*Eliminar Vehiculo*/
export const deleteVehiculo = async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  console.log("id:", id);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.DeleteVehiculos);

    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/*Modificar Vehiculo*/

export const updateVehiculo = async (req, res) => {
  const { Modelo, Color, Placa } = req.body;
  const { id } = req.params;
  if (Modelo == null || Color == null || Placa == null) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("Modelo", SQl.VarChar, Modelo)
      .input("Color", SQl.VarChar, Color)
      .input("Placa", SQl.VarChar, Placa)
      .input("Id", id)
      .query(queries.updateVehiculo);

    res.json({ Modelo, Color, Placa });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/*Elimina un cliente */
/*export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  console.log("id:", id);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.DeleteClientes);

    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};*/
/*Modifica e  */
/*export const updateCliente = async (req, res) => {
  const { nombre, cedula, Correo } = req.body;
  const { id } = req.params;
  if (nombre == null || cedula == null || Correo == null) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nombre", SQl.VarChar, nombre)
      .input("cedula", SQl.VarChar, cedula)
      .input("Correo", SQl.VarChar, Correo)
      .input("Id", id)
      .query(queries.UpdateClientes);

    res.json({ nombre, cedula, Correo });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};*/
