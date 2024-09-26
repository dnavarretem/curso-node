const { Router } = require('express');
const { usuariosGet, 
  usuariosPut, 
  usuariosPost, 
  usuariosDelete, 
  usuariosPatch 
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', usuariosGet);

router.status(201).post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;