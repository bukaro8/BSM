import express from 'express';
import morgan from 'morgan';
import { envs } from './config/plugins/envs/envs.plugin';

const app = express();

//? Middlewares
envs.NODE_ENV === 'development' && app.use(morgan('dev'));
app.use(express.json());
//? Middlewares

export default app;
