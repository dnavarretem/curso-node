const { Categoria, Role, Usuario, Producto } = require('../models');

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

// Verificar si existe la categoria por el id
const existeCategoriaId = async (id = '') => {
  const categoria = await Categoria.findById(id);

  if (!categoria || !categoria.estado) {
    throw new Error(`La categoria con id ${id} no existe en bd`);
  }
}

// Verificar si existe la categoria por el nombre
const existeCategoriaNombre = async (nombre = '') => {
  const categoria = await Categoria.findOne({nombre: nombre.toUpperCase()});

  if (categoria) {
    throw new Error(`La categoria con nombre ${nombre} ya existe en bd`);
  }
}

// Verificar si existe el producto por el id
const existeProductoId = async (id = '') => {
  const producto = await Producto.findById(id);

  if (!producto || !producto.estado) {
    throw new Error(`El producto con id ${id} no existe en bd`);
  }
}

// Verificar si existe el producto por el nombre
const existeProductoNombre = async (nombre = '') => {
  const producto = await Producto.findOne({nombre: nombre.toUpperCase()});

  if (producto) {
    throw new Error(`El producto con nombre ${nombre} ya existe en bd`);
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  idExiste,
  existeCategoriaId,
  existeCategoriaNombre,
  existeProductoId,
  existeProductoNombre
}