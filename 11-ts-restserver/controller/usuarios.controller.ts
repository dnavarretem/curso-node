import { Request, Response } from 'express';
import Usuario from '../models/usuario';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json({ usuarios });
}

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({
      msg: `No existe un usuario con id ${id}`
    })
  }
}

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email
      }
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: `Ya existe un usuario con email ${body.email}`
      });
    }

    const usuario = new Usuario(body);
    await usuario.save();

    res.json(usuario);

  } catch (error) {
    res.status(500).json({
      msg: error
    });
  }
}

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con id ${id}`
      })
    }

    await usuario.update(body);

    res.json(usuario);

  } catch (error) {
    res.status(500).json({
      msg: error
    });
  }
  res.json({
    msg: 'put usuario'
  });
}

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      msg: `No existe un usuario con id ${id}`
    })
  }

  // borrado fisico
  // await usuario.destroy();
  await usuario.update({ estado: false });


  res.json({
    msg: 'delete usuario'
  });
}