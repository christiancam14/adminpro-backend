const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async(req, res = response) => {

  const hospitalesDB = await Hospital.find({}).populate('usuario', 'nombre img');
  
  res.json({
    ok: true,
    hospitales: hospitalesDB,
  });
};
const crearHospitales = async(req, res = response) => {

  const uid = req.uid;
  const hospitalDB = new Hospital({
    usuario: uid,
    ...req.body
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

const actualizarHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarHospitales",
  });
};

const borrarHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarHospitales",
  });
};

module.exports = {
  getHospitales,
  crearHospitales,
  actualizarHospitales,
  borrarHospitales,
};
