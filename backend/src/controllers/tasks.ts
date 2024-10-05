import { Request, Response } from "express";
import { Task, TaskModel } from "../models/task";

export const getTasks = async (req: Request, res: Response) => {
  const tasks: Task[] = await TaskModel.find();
  res.status(200).json(tasks);
}

export const createTasks = async (req: Request, res: Response) => {
  // Get AuthUser's _id from decodedToken from the middleware
  const creator = res.locals.decodedToken._id;
  const task = new TaskModel({ ...req.body, creator });
  await task.save(); // await TaskModel.create(task)
  res.status(200).json(task);
}

export const editTask = async (req: Request, res: Response) => {
  // Get AuthUser's _id from decodedToken from the middleware
  const creator = res.locals.decodedToken._id;
  const task = await TaskModel.findOneAndUpdate({ _id: req.body._id, creator }, req.body);
  if (task) res.status(403).json({ message: 'Unauthorized creator' });
  else res.status(200).json();
}

export const editTaskStatus = async (req: Request, res: Response) => {
  const task = await TaskModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (task)  res.status(200).json();
  else res.status(400).json({ message: 'Not found' });
}

export const getUserTasks = async (req: Request, res: Response) => {
  const tasks = await TaskModel.find({ userId: req.params.userId });
  if (tasks) res.status(200).json(tasks);
  else res.status(400).json({ message: 'Not found' });
}

export const deleteTask = async (req: Request, res: Response) => {
  // Get AuthUser's _id from decodedToken from the middleware
  const creator = res.locals.decodedToken._id;
  const response = await TaskModel.deleteOne({ _id: req.params.id, creator });
  if (response.deletedCount) res.status(200).json();
  else res.status(403).json({ message: 'Unauthorized creator' });
}
