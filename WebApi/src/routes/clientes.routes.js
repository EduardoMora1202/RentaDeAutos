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
  EliminarCliente,
  updateCliente,
  /*updateCliente*/
  updateVehiculo,
  VerAutosTable,
  VerClientesTable,
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

router.get("/GetVerClienteTablas",VerClientesTable);

router.delete("/EliminarCliente/:id", EliminarCliente);

router.put("/ModificarCliente/:id", updateCliente);



export default router;
