import express from 'express';
import * as authController from '../controllers/auth';
import * as authMiddleware from '../middleware/auth';

const router = express.Router(); // Create Express Router

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authMiddleware.checkAuth, authController.getProfile);
router.put('/profile', authMiddleware.checkAuth, authController.editProfile);

export default router;
