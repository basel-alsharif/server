import {
  Request, Response, ErrorRequestHandler,
} from 'express';

const clientError = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serverError: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('server error:');
  // eslint-disable-next-line no-console
  console.log(error);
  if (error.status) {
    res.status(error.status).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { clientError, serverError };
