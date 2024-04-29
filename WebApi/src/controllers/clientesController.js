const nodemailer = require("nodemailer");
import { getConnection, SQl, queries } from "../database/Index";

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
  console.log("Identificacion:", Identificacion, "Contrasena:", Contrasena);
  try {
    const pool = await getConnection();
    const request = pool.request();
    request.input("Identificacion", SQl.VarChar, Identificacion);
    request.input("Contrasena", SQl.VarChar, Contrasena);

    const result = await request.query(queries.GetInicoSesion);
    const user = result.recordset[0]; // Suponiendo que obtienes solo un usuario

    if (user) {
      // Usuario encontrado, inicio de sesión exitoso
      res.json({ success: true, msg: "Inicio de sesión exitoso" });
    } else {
      // Usuario no encontrado o credenciales incorrectas
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

