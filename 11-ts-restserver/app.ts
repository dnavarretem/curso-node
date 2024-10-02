import dotenv from 'dotenv';
import Server from './models/server';

// Configurar dotenv
dotenv.config();

const server: Server = new Server();

server.listen();