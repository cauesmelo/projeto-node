import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes/index';
import '@shared/container';

import '@shared/infra/typeorm';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/', routes);
app.use('/file', express.static(uploadConfig.directory));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server Running. Port: 3333');
});