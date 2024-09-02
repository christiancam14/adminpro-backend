const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarios");

const validarJWT = (req, res = response, next) => {
  // Leer el token
  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        ok: false,
        msg: "Token ha expirado, por favor inicie sesión nuevamente",
      });
    }

    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

const validarADMIN_ROLE = async (req, res, next) => {
  const uid = req.uid;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.json({
        ok: false,
        msg: "No tiene privilegios para hacer eso",
      });
    }

    error;
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }

    if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.json({
        ok: false,
        msg: "No tiene privilegios para hacer eso",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario,
};
