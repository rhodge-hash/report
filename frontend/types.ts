export enum TaskStatus {
  ToDo = 'todo',
  InProgress = 'in-progress',
  Done = 'done',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  imageUrl?: string;
}

export interface Project {
  id:string;
  name: string;
  tasks: Task[];
}