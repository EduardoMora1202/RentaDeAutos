const nodemailer = require("nodemailer");
import { getConnection, SQl, queries } from "../database/Index";

const Alquiler = {};
const tarjetaCredito = {};

export const getAutos = async (req, res) => {
  try {
    const pool = await getConnection();
    const request = await pool.request().query(queries.GetAllAutos);
    res.json(request.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const crearClientes = async (req, res) => {
  const {
    Identificacion,
    Nombre,
    Contrasena,
    IdTipoCliente,
    Telefono,
    Direccion,
  } = req.body;

  if (
    !Identificacion ||
    !Nombre ||
    !Contrasena ||
    !IdTipoCliente ||
    !Telefono ||
    !Direccion
  ) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }

  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input("Identificacion", SQl.VarChar, Identificacion);
    request.input("Nombre", SQl.VarChar, Nombre);
    request.input("Contrasena", SQl.VarChar, Contrasena);
    request.input("IdTipoCliente", SQl.Int, IdTipoCliente);
    request.input("Telefono", SQl.VarChar, Telefono);
    request.input("Direccion", SQl.VarChar, Direccion);
    request.input("TipoUsuario", SQl.Bit, "0" );
    

    await request.query(queries.GetCrearNuevoCliente);

    res.status(201).json({
      msg: "Cliente creado correctamente",
      cliente: {
        Identificacion,
        Nombre,
        Contrasena,
        IdTipoCliente,
        Telefono,
        Direccion,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getVehiculosDetallesById = async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Id", id)
      .query(queries.GetDetallesVehiculoById);

    console.log(result.recordset[0]);
    res.json(result.recordset[0]); // Enviar los datos como JSON
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
/*Elimina un cliente */
export const deleteCliente = async (req, res) => {
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
};

export const ValidarUsuario = async (req, res) => {
  const { Identificacion, Contrasena } = req.body;
  if (Identificacion == null || Contrasena == null) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  try {
    console.log("Identificacion:", Identificacion);
    console.log("Contrasena:", Contrasena);
    console.log("AntesAlquiler.IdCliente:", Alquiler.IdCliente);
    const pool = await getConnection();
    const request = pool.request();
    request.input("Identificacion", SQl.VarChar, Identificacion);
    request.input("Contrasena", SQl.VarChar, Contrasena);

    const result = await request.query(queries.GetInicoSesion);
    const user = result.recordset[0]; //

    if (user) {
      Alquiler.IdCliente = user.Id;
      console.log("Alquiler.IdCliente:", Alquiler.IdCliente);
      res.json({
        success: true,
        msg: "Inicio de sesión exitoso",
        tipoUsuario: user.TipoUsuario,
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "Credenciales de inicio de sesión incorrectas",
      });
    }
  } catch (error) {
    console.error("Error en ValidarUsuario:", error);
    res.status(500).json({ success: false, msg: "Error interno del servidor" });
  }
};

export const formularioReserveDia = async (req, res) => {
  const { FechaRecoger, FechaEntrega } = req.body;
  if (FechaRecoger == null || FechaEntrega == null) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  try {
    console.log("Identificacion:", FechaRecoger);
    console.log("FechaEntrega:", FechaEntrega);
    Alquiler.Fecha_Inicio = FechaRecoger;
    Alquiler.Fecha_Fin = FechaEntrega;
    console.log("Alquiler.Fecha_Inicio:", Alquiler.Fecha_Inicio);
    console.log("Alquiler.Fecha_Fin:", Alquiler.Fecha_Fin);
    res.json({
      success: true,
      msg: "Fecha de recogida y entrega guardadas correctamente",
    });
  } catch (error) {
    console.error("Error en ValidarUsuario:", error);
    res.status(500).json({ success: false, msg: "Error interno del servidor" });
  }
};

export const ReservarVehiculo = async (req, res) => {
  const {
    Numero_Tarjeta,
    Tipo_Tarjeta,
    Fecha_Vencimiento,
    Nombre_Titular,
    Precio_Total,
    Seguro_Vehiculo,
  } = req.body;
  const { id } = req.params;
  if (
    Numero_Tarjeta == null ||
    Tipo_Tarjeta == null ||
    Fecha_Vencimiento == null ||
    Nombre_Titular == null ||
    Precio_Total == null ||
    Seguro_Vehiculo == null
  ) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  console.log("idVehiculo:", id);
  console.log("Precio_Total:", Precio_Total);
  console.log("Seguro_Vehiculo:", Seguro_Vehiculo);
  console.log("Alquiler.IdCliente:", Alquiler.IdCliente);
  console.log("Alquiler.Fecha_Inicio:", Alquiler.Fecha_Inicio);
  console.log("Alquiler.Fecha_Fin:", Alquiler.Fecha_Fin);
  console.log("Numero_Tarjeta:", Numero_Tarjeta);
  console.log("Tipo_Tarjeta:", Tipo_Tarjeta);
  console.log("Fecha_Vencimiento:", Fecha_Vencimiento);
  console.log("Nombre_Titular:", Nombre_Titular);

  try {
    const pool = await getConnection();
    const request = pool.request();
    request.request();
    request.input("Numero_Tarjeta", SQl.VarChar, Numero_Tarjeta);
    request.input("Tipo_Tarjeta", SQl.Int, Tipo_Tarjeta);
    request.input("Fecha_Vencimiento", SQl.Date, Fecha_Vencimiento);
    request.input("Nombre_Titular", SQl.VarChar, Nombre_Titular);
    const resultado = await request.query(queries.PutTarjetaCredito);
    const user = resultado.recordset[0]; //
    if (user) {
      res.json({
        success: true,
        msg: "Se ha agregado exitosamente tu targueta",
        
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "Error,No se ha podido agregar tu tarjeta",
      });
    }
    const paal = await getConnection();
    const requesta = paal.request();
    requesta.request()
    requesta.input("IdClientes", SQl.Int, Alquiler.IdCliente)
    requesta.input("IdVehiculos", SQl.Int, id)
    requesta.input("Fecha_Inicio", SQl.Date, Alquiler.Fecha_Inicio)
    requesta.input("Fecha_Fin", SQl.Date, Alquiler.Fecha_Fin)
    requesta.input("Precio_Total", SQl.VarChar, Precio_Total)
    requesta.input("Seguro_Vehiculo", SQl.Bit, Seguro_Vehiculo);

    const result = await request.query(queries.PutAlquiler);

    const user2 = result.recordset[0]; //
    if (user2) {
      res.json({
        success: true,
        msg: "Se ha agregado exitosamente tu Alquiler",
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "Hubo un error en tu arquiler",
      });
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
