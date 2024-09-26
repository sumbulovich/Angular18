import { Schema, Types, model } from 'mongoose';
import { AuthUserModel } from './auth-user';

export type TaskStatus = 'open' | 'in progress' | 'done';

export interface Task {
  _id: Types.ObjectId;
  userId: string;
  title: string;
  summary: string;
  dueDate: Date;
  createdAt: Date;
  status: TaskStatus;
  creator: string;
}

const taskSchema = new Schema<Task>({
  userId: { type: String, ref: AuthUserModel, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true },
  creator: { type: String, ref: "AuthUser", required: true },
});

export const TaskModel = model<Task>('Task', taskSchema);
