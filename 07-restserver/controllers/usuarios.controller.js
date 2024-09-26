const { response, request } = require('express');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
  res.json({
    msg: 'get api - controlador',
    q,
    nombre, 
    apikey,
    page,
    limit
  });
};

const usuariosPost = async (req, res = response) => {
  const body = req.body;
  const usuario = new Usuario(body);

  await usuario.save();

  res.json({
    msg: 'post api - controlador',
    usuario
  });
};

const usuariosPut = (req, res = response) => {
  const {id} = req.params;
  
  res.json({
    msg: 'put api - controlador'
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'delete api - controlador'
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch api - controlador'
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch
}