import express from 'express';
import { hash } from 'bcrypt';
import { AuthUserModel } from '../models/auth-user';

const router = express.Router(); // Create Express Router

router.post('/signup', async (req, res) => {
  const password = await hash(req.body.password, 10)
  const user = new AuthUserModel({ ...req.body, password });

  const newUser = await user.save();
  res.status(200).json({ user: newUser });
});

export default router;
