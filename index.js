require("dotenv").config();
const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");

const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

const port = process.env.PORT;

// Rutas
app.get("/", (req, res) => {
  res.status(400).json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
