import express from "express";
import config from "./config";
import session from 'express-session';
import clientesRoutes from "./routes/clientes.routes";
const Multer = require("multer");


const app = express();

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  }));
  
//settings
app.set("port", config.port);


//`middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(clientesRoutes);

export default app;
