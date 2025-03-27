import { NextFunction, Response } from 'express';
import { getClientSecret } from '../services';
import { RequestWithUserRole } from '../types';
import { templateErrors } from '../helpers';

const findClientSecret = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  try {
    const { SessionPrice } = req.body;

    if (typeof SessionPrice !== 'number') {
      throw templateErrors.BAD_REQUEST('Invalid price');
    }
    const userId = req.user?.userId;
    const paymentIntent = await getClientSecret(SessionPrice, userId);
    return res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export default findClientSecret;
