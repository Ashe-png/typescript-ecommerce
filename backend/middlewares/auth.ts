import { NextFunction, Request, Response } from 'express';
import admin from '../firebase/index';
import User from '../models/user';

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   console.log(req.body); //token
  //   next();
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken as string);
    // console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);
    req.body.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: 'Invalid or expired token1',
    });
  }
};

export const adminCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser?.role !== 'admin') {
    res.status(403).json({
      err: 'Admin resource. Access denied',
    });
  } else {
    next();
  }
};
