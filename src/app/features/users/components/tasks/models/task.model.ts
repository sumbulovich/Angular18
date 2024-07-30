export type TaskStatus = 'open' | 'in progress' | 'done';

export interface Task {
  id: number;
  userId: number;
  title: string;
  summary: string;
  dueDate: Date;
  date: Date;
  status: TaskStatus;
}
