import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { items, total } = req.body;

  Product.find({ _id: { $in: items } })
    .then((products) => {
      const hasUnavailableProduct = products.some(
        (product) => product.price === null,
      );

      const orderTotal = products.reduce(
        (sum, product) => sum + (product.price || 0),
        0,
      );

      if (
        products.length !== items.length
        || hasUnavailableProduct
        || orderTotal !== total
      ) {
        next(new BadRequestError(
          'Некорректные данные заказа',
        ));
        return;
      }

      res.send({
        id: faker.string.uuid(),
        total,
      });
    })
    .catch(next);
};

export default createOrder;
