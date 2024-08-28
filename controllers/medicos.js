const { response } = require("express");

const getMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getMedicos",
  });
};
const crearMedicos = (req, res = response) => {
  res.json({
    ok: true,
    msg: "crearMedicos",
  });
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
