import { Router } from "express";
import {
  crearClientes,
  getAutos,
  getVehiculosDetallesById,
  ValidarUsuario,
} from "../controllers/clientesController";

import {
  AgregarVehiculos,
  /*deleteCliente, */
  deleteVehiculo,
  /*updateCliente*/
  updateVehiculo,
  VerAutosTable,
} from "../controllers/AdminController";

const cors = require("cors");
const router = Router();

router.use(cors()); // Habilita CORS para todas las rutas

router.get("/VerVehiculos", getAutos);

router.get("/vehiculoDetallesID/:id", getVehiculosDetallesById);

router.post("/CrearClientes", crearClientes);

router.post("/ValidarCliente", ValidarUsuario);

/*Rutas Administrador*/
router.get("/GetVerAutosTablas", VerAutosTable);

router.post("/AgregarNuevoVehiculo", AgregarVehiculos);

router.delete("/EliminarVehuculos/:id", deleteVehiculo);

router.put("/ModificarVehiculo/:id", updateVehiculo);

export default router;
