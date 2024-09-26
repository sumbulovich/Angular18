import express from 'express';
import { Task, TaskModel } from '../models/task';
import { checkAdmin, checkAuth } from '../middleware/auth';

const router = express.Router(); // Create Express Router

router.get('', async (req, res) => {
  const tasks: Task[] = await TaskModel.find();
  res.status(200).json(tasks);
});

router.post('', checkAuth, checkAdmin, async (req, res) => {
  // Get AuthUser's _id from decodedToken from the middleware
  const creator = res.locals.decodedToken._id;
  const task = new TaskModel({ ...req.body, creator });
  await task.save(); // await TaskModel.create(task)
  res.status(200).json(task);
});

router.put('', checkAuth, checkAdmin, async (req, res) => {
  // Get AuthUser's _id from decodedToken from the middleware
  const creator = res.locals.decodedToken._id;
  const task = await TaskModel.findOneAndUpdate({ _id: req.body._id, creator }, req.body);
  if (!task) return res.status(403).json({ message: 'Unauthorized creator' });
  res.status(200).json();
});

router.put('/status/:id', checkAuth, async (req, res) => {
  const task = await TaskModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!task) return res.status(400).json({ message: 'Not found' });
  res.status(200).json();
});

router.get('/:userId', async (req, res) => {
  const tasks = await TaskModel.find({ userId: req.params.userId });
  if (!tasks) return res.status(400).json({ message: 'Not found' });
  res.status(200).json(tasks);
});

router.delete('/:id', checkAuth, checkAdmin, async (req, res) => {
  // Get AuthUser's _id from decodedToken from the middleware
  const creator = res.locals.decodedToken._id;
  const response = await TaskModel.deleteOne({ _id: req.params.id, creator });
  if (!response.deletedCount) return res.status(403).json({ message: 'Unauthorized creator' });
  res.status(200).json();
});

export default router;
