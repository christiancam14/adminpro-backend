/*
    Ruta: /api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getMedicos,
  crearMedicos,
  actualizarMedicos,
  borrarMedicos,
  getMedicoById,
} = require("../controllers/medicos");

const router = Router();

router.get("/", [validarJWT], getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del médico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe ser valido").isMongoId(),
    validarCampos,
  ],
  crearMedicos
);

router.put("/:id", [], actualizarMedicos);

router.delete("/:id", [], borrarMedicos);

router.get("/:id", [], getMedicoById);

module.exports = router;
