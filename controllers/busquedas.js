const Usuario = require("../models/usuarios");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const { response } = require("express");

// getTODO
const getTodo = async (req, res) => {
  const busqueda = req.params.busqueda;

  const regexp = new RegExp(busqueda, "i");

  /*
  const usuario = await Usuario.find({ nombre: regexp });
  const medico = await Medico.find({ nombre: regexp });
  const hospital = await Hospital.find({ nombre: regexp });
  */

  const [usuario, medico, hospital] = await Promise.all([
    Usuario.find({ nombre: regexp }),
    Medico.find({ nombre: regexp }),
    Hospital.find({ nombre: regexp }),
  ]);

  res.json({
    ok: false,
    busqueda,
    usuario,
    medico,
    hospital,
  });
};

const getDocumentosColeccion = async (req, res) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regexp = new RegExp(busqueda, "i");
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regexp })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;

    case "hospitales":
      data = await Hospital.find({ nombre: regexp }).populate(
        "usuario",
        "nombre img"
      );
      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regexp });
      res.json({
        ok: true,
        resultados: data,
      });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla debe ser usuarios/medicos/hospitales",
      });
  }
  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
