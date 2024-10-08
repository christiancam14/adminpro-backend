/*
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  crearUsuariosBulk,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, validarADMIN_ROLE_o_MismoUsuario, validarADMIN_ROLE } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [validarJWT, validarADMIN_ROLE], getUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    validarJWT,
    validarADMIN_ROLE_o_MismoUsuario,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id", [validarJWT], borrarUsuario);

module.exports = router;
