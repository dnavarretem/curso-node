const { response } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');
const path = require('path');
const fs = require('fs');



const cargarArchivo = async (req, res = response) => {
  if (!req.files.archivo) {
    return res.status(400).json({ msg: 'No files were uploaded.' });
  }

  try {
    const nombre = await subirArchivo(req.files);
    return res.json(nombre);
  } catch (msg) {
    return res.status(400).json(msg);
  }
}

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con id ${id}`
        });
      }

      break;

    case 'productos':
      modelo = await Producto.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con id ${id}`
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: 'No implementado'
      });
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    // Hay que borrar la img del servidor
    const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  return res.json(modelo);
}

const mostrarImg = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con id ${id}`
        });
      }

      break;

    case 'productos':
      modelo = await Producto.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con id ${id}`
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: 'No implementado'
      });
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    // Hay que borrar la img del servidor
    const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg)
    }
  }

  const noImgPath = path.join(__dirname, '../assets/no_image.jpg')
  return res.sendFile(noImgPath);
}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImg
}