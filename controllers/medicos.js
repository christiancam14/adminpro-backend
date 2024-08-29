const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
  const medicosDB = await Medico.find({})
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre");

  res.json({
    ok: true,
    medicos: medicosDB,
  });
};
const crearMedicos = async (req, res = response) => {
  const uid = req.uid;
  const medicoDB = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    await medicoDB.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Hable con el administradors",
    });
  }
};

const actualizarMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarMedicos",
  });
};
const borrarMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarMedicos",
  });
};

module.exports = {
  getMedicos,
  crearMedicos,
  actualizarMedicos,
  borrarMedicos,
};
