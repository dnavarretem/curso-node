const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth/',
      usuarios: '/api/usuarios',
      categorias: '/api/categorias',
      productos: '/api/productos',
      buscar: '/api/buscar',
      uploads: '/api/uploads'
    };

    // Conectar base de datos
    this.conectarDb();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  async conectarDb() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));

    // Carga archivos
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
    this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
    this.app.use(this.paths.productos, require('../routes/productos.routes'));
    this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;