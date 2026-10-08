import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { DB_ADDRESS, PORT } from './config';
import productRouter from './routes/product';
import orderRouter from './routes/order';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRouter);
app.use('/order', orderRouter);

mongoose.connect(DB_ADDRESS)
  .then(() => {
    app.listen(PORT);
  });
