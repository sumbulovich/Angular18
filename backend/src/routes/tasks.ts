import express from 'express';
import * as tasksController from '../controllers/tasks';
import * as authMiddleware from '../middleware/auth';

const router = express.Router(); // Create Express Router

router.get('', tasksController.getTasks);
router.post('', authMiddleware.checkAuth, authMiddleware.checkAdmin, tasksController.createTasks);
router.put('', authMiddleware.checkAuth, authMiddleware.checkAdmin, tasksController.editTask);
router.put('/status/:id', authMiddleware.checkAdmin, tasksController.editTaskStatus);
router.get('/:userId', tasksController.getUserTasks);
router.delete('/:id', authMiddleware.checkAuth, authMiddleware.checkAdmin, tasksController.deleteTask);

export default router;
