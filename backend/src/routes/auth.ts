import { catchError } from 'rxjs';
import express from 'express';
import { compare, hash } from 'bcrypt';
import { AuthUserModel } from '../models/auth-user';
import { sign } from 'jsonwebtoken';

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
  if (!isAuth) return res.status(401).json({ message: 'Unauthorized' });

  const token = sign({ email: user.email, userId: user._id }, 'customSecretOrPrivateKeyForEncodingAlgorithm', { expiresIn: '1h' });
  res.status(200).json({ token })
});

export default router;
