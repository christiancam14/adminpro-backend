const { response } = require("express");

const getHospitales = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getHospitales",
  });
};
const crearHospitales = (req, res = response) => {
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
