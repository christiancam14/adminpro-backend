require("dotenv").config();
const path = require("path");

const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");

const app = express();

// Configurar CORS
app.use(cors());

// Carpeta pública
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

const port = process.env.PORT;

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/upload", require("./routes/uploads"));

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
