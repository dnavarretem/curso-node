const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') =>  {
  const existeRol = await Role.findOne({rol});
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
}

// Verificar si el correo existe
const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe en BD`);
  }
}

// Verificiar si el usuario existe por id
const idExiste = async (id = '') => {
  const existeId = await Usuario.findById(id);

  if (!existeId) {
    throw new Error(`El usuario con id ${id} no existe en BD`);
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  idExiste
}