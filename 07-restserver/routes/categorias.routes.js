const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, getCategorias, getOneCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias.controller');
const { existeCategoriaId, existeCategoriaNombre } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorías - público
router.get('/', getCategorias);

// Obtener una categoría - público
router.get('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaId),
  validarCampos
], getOneCategoria);

// Crear categoría - privado - cualquier persona con un token válido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom(existeCategoriaNombre),
  validarCampos
], crearCategoria);

// Actualizar categoría - privado - cualquier persona con un token válido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaId),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom(existeCategoriaNombre),
  validarCampos
], actualizarCategoria);

// Eliminar categoría - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeCategoriaId),
  validarCampos
], eliminarCategoria);

module.exports = router;