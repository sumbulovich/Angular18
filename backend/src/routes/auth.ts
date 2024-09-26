import { catchError } from 'rxjs';
import express from 'express';
import { compare, hash } from 'bcrypt';
import { AuthUserModel } from '../models/auth-user';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../constatnts';
import { checkAuth } from '../middleware/auth';

const router = express.Router(); // Create Express Router

router.post('/signup', async (req, res) => {
  const password = await hash(req.body.password, 10)
  const user = new AuthUserModel({ ...req.body, password });

  user.save()
    .then(() => res.status(200).json({ message: 'User registered' }))
    .catch((err) => res.status(500).json(err))
});

router.post('/login', async (req, res) => {
  const user = await AuthUserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'Not found' });

  const isAuth = await compare(req.body.password, user.password);
  if (!isAuth) return res.status(401).json({ message: 'Incorrect email or password' });

  const expirationMs = 3600000; // 1h
  const { name, lastName, email, permission } = user;
  const token = sign({ email, permission }, SECRET_KEY, { expiresIn: expirationMs / 1000 });
  res.status(200).json({ name, lastName, email, permission, token, expiration: expirationMs })
});

router.get('/profile', checkAuth, async (req, res) => {
  // Get email from decodedToken from the middleware
  const user = await AuthUserModel.findOne({ email: res.locals.decodedToken.email });
  if (!user) return res.status(400).json({ message: 'Not found' });
  const { name, lastName, email, permission } = user;
  res.status(200).json({ name, lastName, email, permission });
});

router.put('/profile', checkAuth, async (req, res) => {
  // Get email from decodedToken from the middleware
  const user = await AuthUserModel.findOneAndUpdate({ email: res.locals.decodedToken.email }, req.body);
  if (!user) return res.status(400).json({ message: 'Not found' });
  res.status(200).json();
});

export default router;
