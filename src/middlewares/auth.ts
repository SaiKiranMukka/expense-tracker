import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { verifySignedToken } from "../utils/utils";
import './passportHandler';

export class Auth {
  async authenticateJWT(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', (err, user, info) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ status: err, message: 'Access denied'});
      }
      if (info?.name === "TokenExpiredError") {
        return res.status(403).json({ code: 'TOKEN_EXPIRED', message: 'Token Expired' });
      }
      if (!user) {
        return res.status(403).json({ code: 'UNAUTHORIZED', message: 'Access denied' });
      } else {
        req.user = info;
        return next();
      }
    })(req, res, next);
  }

  // const errorHandler = (error, request, response, next) => {
  //   logger.error(error.message)
  
  //   if (error.name === 'CastError') {
  //     return response.status(400).send({ error: 'malformatted id' })
  //   } else if (error.name === 'ValidationError') {
  //     return response.status(400).json({ error: error.message })
  //   } else if (error.name === 'JsonWebTokenError') {
  //     return response.status(401).json({
  //       error: 'invalid token'
  //     })
  //   } else if (error.name === 'TokenExpiredError') {
  //     return response.status(401).json({
  //       error: 'token expired'
  //     })
  //   }
  
  //   next(error)
  // }
  
}

