import { NextFunction, Request, RequestHandler, Response } from 'express';

const isAuthenticated = (): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.headers?.authorization?.split(' ')[1] !== req?.session.nonce) {
      res.status(403).json({
        error: 'ACCESS DENIED',
      });
    }
    next();
  };
};

export default isAuthenticated;
