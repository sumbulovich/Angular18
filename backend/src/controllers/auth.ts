import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import { AuthUserModel } from "../models/auth-user";
import { sign } from "jsonwebtoken";


export const signup = async (req: Request, res: Response) => {
  const password = await hash(req.body.password, 10)
  const user = new AuthUserModel({ ...req.body, password });

  user.save()
    .then(() => res.status(200).json({ message: 'User registered' }))
    .catch((err) => res.status(500).json(err))
}

export const login = async (req: Request, res: Response) => {
  const user = await AuthUserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'Not found' });

  const isAuth = await compare(req.body.password, user.password);
  if (!isAuth) return res.status(401).json({ message: 'Incorrect email or password' });

  const expirationMs = 3600000; // 1h
  const { _id, name, lastName, email, permission } = user;
  const token = sign({ _id, permission }, process.env['JTW_SECRET_KEY']!, { expiresIn: expirationMs / 1000 });
  res.status(200).json({ _id, name, lastName, email, permission, token, expiration: expirationMs })
}

export const getProfile = async (req: Request, res: Response) => {
  // Get AuthUser's _id from decodedToken from the middleware
  const user = await AuthUserModel.findOne({ _id: res.locals.decodedToken._id });
  if (!user) return res.status(400).json({ message: 'Not found' });
  const { _id, name, lastName, email, permission } = user;
  res.status(200).json({ _id, name, lastName, email, permission });
}

export const editProfile = async (req: Request, res: Response) => {
  // Get AuthUser's _id from decodedToken from the middleware
  const user = await AuthUserModel.findOneAndUpdate({ _id: res.locals.decodedToken._id }, req.body);
  if (!user) return res.status(400).json({ message: 'Not found' });
  res.status(200).json();
}
