import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import { DB_ADDRESS, PORT } from './config';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import NotFoundError from './errors/not-found-error';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS)
  .then(() => {
    app.listen(PORT);
  });
