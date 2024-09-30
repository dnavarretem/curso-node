const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { getProductos, crearProducto, getOneProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');
const { existeProductoNombre, existeProductoId, existeCategoriaId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las productos - público
router.get('/', getProductos);

// Obtener una producto - público
router.get('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeProductoId),
  validarCampos
], getOneProducto);

// Crear producto - privado - cualquier persona con un token válido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('nombre').custom(existeProductoNombre),
  check('categoria', 'El id de categoria no es valido').isMongoId(),
  check('categoria').custom(existeCategoriaId),
  validarCampos
], crearProducto);

// Actualizar producto - privado - cualquier persona con un token válido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeProductoId),
  check('nombre', 'El nombre es obligatorio').optional().not().isEmpty(),
  check('categoria', 'El id de categoria no es un id valido').optional().isMongoId(),
  check('categoria').custom(existeCategoriaId),
  check('nombre').custom(existeProductoNombre),
  validarCampos
], actualizarProducto);

// Eliminar producto - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeProductoId),
  validarCampos
], eliminarProducto);

module.exports = router;