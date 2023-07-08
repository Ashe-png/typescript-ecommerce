import express, { Response, Request } from 'express';
import User, { IUser } from '../models/user';

type NewType = Request;

export const createOrUpdateUser = async (req: Request, res: Response) => {
  const { name, picture, email } = req.body.user;
  console.log(req.body.user);
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split('@')[0], picture },

    { new: true }
  );
  if (user) {
    console.log('User Updated', user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split('@')[0],
      picture,
    }).save();
    console.log('User created', newUser);
    res.json(newUser);
  }
};
