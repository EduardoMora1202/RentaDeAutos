const nodemailer = require("nodemailer");
import { getConnection, SQl, queries } from "../database/Index";
import { GenerarCodigoAleatorio } from "../Models/Validaciones";


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
    request.input("TipoUsuario", SQl.Bit, 0);

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


export const ValidarUsuario = async (req, res) => {
  const { Identificacion, Contrasena } = req.body;
  if (Identificacion == null || Contrasena == null) {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor llena todos los espacios",
    });
  }
  try {
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
    Alquiler.Fecha_Inicio = FechaRecoger;
    Alquiler.Fecha_Fin = FechaEntrega;
    const dias = (new Date(FechaEntrega) - new Date(FechaRecoger)) / 86400000;
    console.log("Dias:", dias);
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
  const CodigoReserva = await GenerarCodigoAleatorio();
  const PrecioTotal1 = parseFloat(Precio_Total);
  try {
    const pool = await getConnection();
    const requestTarjeta = pool.request();
    requestTarjeta.input("Numero_Tarjeta", SQl.VarChar, Numero_Tarjeta);
    requestTarjeta.input("Tipo_Tarjeta", SQl.Int, Tipo_Tarjeta);
    requestTarjeta.input("Fecha_Vencimiento", SQl.Date, Fecha_Vencimiento);
    requestTarjeta.input("Nombre_Titular", SQl.VarChar, Nombre_Titular);
    const resultadoTarjeta = await requestTarjeta.query(
      queries.PutTarjetaCredito
    );
    /*Insertar Alquiler */
    const requestAlquiler = pool.request();
    requestAlquiler.input("IdClientes", SQl.Int, Alquiler.IdCliente);
    requestAlquiler.input("IdVehiculos", SQl.Int, id);
    requestAlquiler.input("Fecha_Inicio", SQl.Date, Alquiler.Fecha_Inicio);
    requestAlquiler.input("Fecha_Fin", SQl.Date, Alquiler.Fecha_Fin);
    requestAlquiler.input("Precio_Total", SQl.Decimal, PrecioTotal1);
    requestAlquiler.input("Seguro_Vehiculo", SQl.Bit, Seguro_Vehiculo);
    requestAlquiler.input("CodigoReserva", SQl.VarChar, CodigoReserva);
    const resultadoAlquiler = await requestAlquiler.query(queries.PutAlquiler);

    // Verificar resultados
    if (resultadoTarjeta.rowsAffected[0] > 0 && resultadoAlquiler.rowsAffected[0] > 0) {
      console.log("Se ha agregado exitosamente tu tarjeta y alquiler");
      console.log("CodigoReserva:", CodigoReserva);
      res.json({
        success: true,
        msg: "Se ha agregado exitosamente tu tarjeta y alquiler",
        CodigoReserva: CodigoReserva,
      });
    } else {
      console.log("Hubo un error al agregar tu tarjeta o alquiler");
      res.status(401).json({
        success: false,
        msg: "Hubo un error al agregar tu tarjeta o alquiler",
      });
    }
  } catch (error) {
    console.log("Error en ReservarVehiculo:", error);
    res.status(500).json({ success: false, msg: "Error interno del servidor", error: error.message });
  }
};
