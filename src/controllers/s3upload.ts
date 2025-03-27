import { Response, Request, NextFunction } from 'express';
import { ValidationError } from 'yup';
import { createPresignedUrl } from '../services';
import { templateErrors } from '../helpers';

const uploadFile = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const url = await createPresignedUrl();
    res.json({
      message: 'Presigned url generated successfully it will expire in 60s',
      data: url,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(templateErrors.BAD_REQUEST(err.message));
    }
    next(err);
  }
};

export default uploadFile;
