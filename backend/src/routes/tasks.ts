import express from 'express';
import { Task, TaskModel } from '../models/task';
import { checkAdmin, checkAuth } from '../middleware/auth';

const router = express.Router(); // Create Express Router

router.get('', async (req, res) => {
  const tasks: Task[] = await TaskModel.find();
  res.status(200).json(tasks);
});

router.post('', checkAuth, checkAdmin, async (req, res) => {
  const task = new TaskModel({ ...req.body });
  await task.save(); // await TaskModel.create(task)
  res.status(200).json(task);
});

router.put('', checkAuth, checkAdmin, async (req, res) => {
  const task = await TaskModel.findOneAndUpdate({ _id: req.body._id }, { ...req.body });
  if (!task) return res.status(400).json({ message: 'Not found' });
  res.status(200).json();
});

router.put('/status/:id', checkAuth, async (req, res) => {
  const task = await TaskModel.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
  if (!task) return res.status(400).json({ message: 'Not found' });
  res.status(200).json();
});

router.get('/:userId', async (req, res) => {
  const tasks = await TaskModel.find({ userId: req.params.userId });
  if (!tasks) return res.status(400).json({ message: 'Not found' });
  res.status(200).json(tasks);
});

router.delete('/:id', checkAuth, checkAdmin, async (req, res) => {
  const response = await TaskModel.deleteOne({ _id: req.params.id });
  if (!response.deletedCount) return res.status(400).json({ message: 'Not found' });
  res.status(200).json();
});

export default router;
