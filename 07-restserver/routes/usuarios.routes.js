const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios.controller');
const { esRoleValido, emailExiste, idExiste } = require('../helpers/db-validators');
const {
  validarCampos, 
  validarJWT, 
  esAdminRole, 
  tieneRole
} = require('../middlewares');


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(emailExiste),
  // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPost);

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(idExiste),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut);

router.delete('/:id', [
  validarJWT,
  // esAdminRole,
  tieneRole('ADMIN_ROLE', 'USER_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(idExiste),
  validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;