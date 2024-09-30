const { response } = require('express');
const { Producto } = require('../models');


// obtener categorias - paginado - total - populate
const getProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
  ]);

  return res.json({
    total,
    productos
  });
}

// obtene categoria - populate
const getOneProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');

  return res.json(producto);
}

// crear
const crearProducto = async (req, res = response) => {
  const { nombre, categoria } = req.body;

  const data = {
    nombre: nombre.toUpperCase(),
    usuario: req.usuario._id,
    categoria: categoria
  }

  const producto = new Producto(data);

  // Guardar db
  await producto.save();

  return res.status(201).json(producto);
}

// actualizar categoria
const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { _id, estado, usuario, ...data } = req.body;

  data.nombre = data.nombre?.toUpperCase();
  data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');

  return res.json(producto);
}

// borrar categoria - estado: false
const eliminarProducto = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  ).populate('usuario', 'nombre')
    .populate('categoria', 'nombre');

  res.json(producto);
}

module.exports = {
  getProductos,
  getOneProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}