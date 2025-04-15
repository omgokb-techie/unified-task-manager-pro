import { Building, Task, TaskFormData, TaskStatus, User } from "@/types/task";

const API_BASE_URL = 'http://localhost:5000/api';

// Common headers for all requests
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Task API Service
export const TaskService = {
  // Get all tasks without any filters
  getAllTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  // Get filtered tasks by building ID or user ID
  getFilteredTasks: async (params?: { buildingId?: string; userId?: string }): Promise<Task[]> => {
    const queryParams = new URLSearchParams();
    if (params?.buildingId) queryParams.append('buildingId', params.buildingId);
    if (params?.userId) queryParams.append('userId', params.userId);

    const response = await fetch(`${API_BASE_URL}/tasks?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch filtered tasks');
    }
    return response.json();
  },

  // Get all buildings
  getAllBuildings: async (): Promise<Building[]> => {
    const response = await fetch(`${API_BASE_URL}/buildings`);
    if (!response.ok) {
      throw new Error('Failed to fetch buildings');
    }
    return response.json();
  },

  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  // Create a new task
  createTask: async (taskData: TaskFormData): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: taskData.title,
        userId: taskData.userId,
        status: taskData.status,
        due_date: taskData.dueDate, // Note: backend expects due_date
        buildingId: taskData.buildingId
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  // Update task status
  updateTaskStatus: async (taskId: string, status: TaskStatus): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task status');
    }
    return response.json();
  },
};
