export type TaskStatus = 'open' | 'in progress' | 'done';

export interface Task {
  _id?: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: Date;
  createdAt?: Date;
  status: TaskStatus;
}
