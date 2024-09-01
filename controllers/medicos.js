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

const getMedicoById = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById(id)
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre");

    res.json({
      ok: true,
      medicos: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: true,
      msg: "Hable con el administrador",
    });
  }
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

const actualizarMedicos = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      res.status(404).json({
        ok: false,
        msg: "Médico no encontrado por id",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );

    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Hable con el administrador",
    });
  }
};
const borrarMedicos = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      res.status(404).json({
        ok: false,
        msg: "Médico no encontrado por id",
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Medico eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: true,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getMedicos,
  getMedicoById,
  crearMedicos,
  actualizarMedicos,
  borrarMedicos,
};
