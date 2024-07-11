import { Task } from "../models/task.model";

export const DUMMY_TASKS: Task[] = [
  {
    id: 1,
    userId: 1,
    title: 'Master Angular',
    summary:
      'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: new Date('2025-12-31'),
    date: new Date('2024-12-31'),
  },
  {
    id: 2,
    userId: 3,
    title: 'Build first prototype',
    summary: 'Build a first prototype of the online shop website',
    dueDate: new Date('2024-05-31'),
    date: new Date('2024-02-31'),
  },
  {
    id: 3,
    userId: 3,
    title: 'Prepare issue template',
    summary:
      'Prepare and describe an issue template which will help with project management',
    dueDate: new Date('2024-06-15'),
    date: new Date('2024-01-31'),
  }
];
