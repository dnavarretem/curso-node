import express, { Application } from 'express';
import userRoutes from '../routes/usuario.routes';
import cors from 'cors';
import db from '../db/connection';


class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    usuarios: '/api/usuarios'
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    this.dbConnection();

    this.middlewares();

    // Definir mis rutas
    this.routes();
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());

    // Carpeta publica
    this.app.use(express.static('public'));
  }

  async dbConnection() {
    try{
      await db.authenticate();
      console.log('Database online');
    } catch(error) {
      throw error;
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server listening en puerto ' + this.port);
    })
  }
}

export default Server;