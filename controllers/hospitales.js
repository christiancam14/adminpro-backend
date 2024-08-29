const { response } = require("express");
const Hospital = require("../models/hospital");
const hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  const hospitalesDB = await Hospital.find({}).populate(
    "usuario",
    "nombre img"
  );

  res.json({
    ok: true,
    hospitales: hospitalesDB,
  });
};
const crearHospitales = async (req, res = response) => {
  const uid = req.uid;
  const hospitalDB = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    await hospitalDB.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Hable con el administradors",
    });
  }

  res.json({
    ok: true,
    msg: "crearHospitales",
  });
};

const actualizarHospitales = async (req, res = response) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      hospital: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const borrarHospitales = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(uid);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "Hospital eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

module.exports = {
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  borrarHospitales,
};
