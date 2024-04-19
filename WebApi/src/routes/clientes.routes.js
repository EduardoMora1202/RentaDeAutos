import { Router } from "express";
import {
  crearClientes,
  getAutos,
  getVehiculosDetallesById,
  deleteCliente,
  updateCliente,
  ValidarUsuario,
} from "../controllers/clientesController";

const cors = require("cors");
const router = Router();

router.use(cors()); // Habilita CORS para todas las rutas

router.get("/VerVehiculos", getAutos);

router.get("/vehiculoDetallesID/:id", getVehiculosDetallesById);

router.post("/CrearClientes", crearClientes);

router.put("/ActualizarClientes/:id", updateCliente);

router.delete("/EliminarClientes/:id", deleteCliente);

router.post("/ValidarCliente", ValidarUsuario);

export default router;
