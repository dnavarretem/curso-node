const { response } = require('express');
const {Categoria} = require('../models');


// obtener categorias - paginado - total - populate
const getCategorias = async(req, res = response) => {
  const {limite = 5, desde = 0} = req.query;
  const query = {estado: true};

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate('usuario', 'nombre')
  ]);

  return res.json({
    total,
    categorias
  });
}

// obtene categoria - populate
const getOneCategoria = async(req, res = response) => {
  const {id} = req.params;

  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

  return res.json(categoria);
}

// crear
const crearCategoria = async(req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({nombre});

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`
    })
  }

  const data = {
    nombre, 
    usuario: req.usuario._id
  }

  const categoria = new Categoria(data);

  // Guardar db
  await categoria.save();

  return res.status(201).json(categoria);
}

// actualizar categoria
const actualizarCategoria = async(req, res = response) => {
  const {id} = req.params;
  const {_id, estado, usuario, ...data} = req.body;
  
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})
    .populate('usuario', 'nombre');

  return res.json(categoria);  
}

// borrar categoria - estado: false
const eliminarCategoria = async(req, res = response) => {
  const {id} = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    {estado: false},
    {new: true}
  ).populate('usuario', 'nombre');

  res.json(categoria);
}

module.exports = {
  getCategorias,
  getOneCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
}