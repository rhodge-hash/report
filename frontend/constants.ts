
import { TaskStatus } from './types';

export const KANBAN_COLUMNS = [
  { id: TaskStatus.ToDo, title: 'To Do' },
  { id: TaskStatus.InProgress, title: 'In Progress' },
  { id: TaskStatus.Done, title: 'Done' },
];
