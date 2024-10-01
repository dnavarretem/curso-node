const { Router } = require('express');
const { cargarArchivo, actualizarImagen, mostrarImg } = require('../controllers/uploads.controller');
const { check } = require('express-validator');
const { validarCampos, validarArchivo } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarArchivo,cargarArchivo);

router.put('/:coleccion/:id',[
  validarArchivo,
  check('id', 'El id no es valido').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
  check('id', 'El id no es valido').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], mostrarImg)

module.exports = router;