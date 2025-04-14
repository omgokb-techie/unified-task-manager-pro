
export type TaskStatus = 'To Do' | 'In Progress' | 'Complete';

export interface User {
  id: string;
  name: string;
}

export interface Building {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  assignedUser: User;
  status: TaskStatus;
  dueDate: Date;
  buildingId: string;
  building: Building;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFormData {
  title: string;
  assignedUserId: string;
  status: TaskStatus;
  dueDate: string;
  buildingId: string;
}
