const Usuario = require("../models/usuarios");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const { response } = require("express");

// getTODO
const getTodo = async (req, res) => {
  const busqueda = req.params.busqueda;

  const regexp = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regexp }),
    Medico.find({ nombre: regexp }),
    Hospital.find({ nombre: regexp }),
  ]);

  res.json({
    ok: true,
    busqueda,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentosColeccion = async (req, res) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regexp = new RegExp(busqueda, "i");
  let data = [];

  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, por favor contacte al administrador",
    });
  }
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
