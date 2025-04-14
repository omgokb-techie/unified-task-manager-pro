
import { Building, Task, TaskFormData, TaskStatus, User } from "@/types/task";
import { mockBuildings, mockTasks, mockUsers } from "./mockData";
import { addDays, differenceInHours, isPast, startOfToday } from "date-fns";

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory "database" for tasks
let tasks = [...mockTasks];

// Task API Service
export const TaskService = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    await delay(300); // Simulate API delay
    return [...tasks];
  },
  
  // Get tasks by building ID
  getTasksByBuildingId: async (buildingId: string): Promise<Task[]> => {
    await delay(300);
    return tasks.filter(task => task.buildingId === buildingId);
  },
  
  // Get tasks by assigned user
  getTasksByUserId: async (userId: string): Promise<Task[]> => {
    await delay(300);
    return tasks.filter(task => task.assignedUser.id === userId);
  },
  
  // Create a new task
  createTask: async (taskData: TaskFormData): Promise<Task> => {
    await delay(500);
    
    const user = mockUsers.find(user => user.id === taskData.assignedUserId);
    const building = mockBuildings.find(building => building.id === taskData.buildingId);
    
    if (!user || !building) {
      throw new Error("Invalid user or building ID");
    }
    
    const newTask: Task = {
      id: `task-${tasks.length + 1}-${Date.now()}`,
      title: taskData.title,
      assignedUser: user,
      status: taskData.status,
      dueDate: new Date(taskData.dueDate),
      buildingId: taskData.buildingId,
      building: building,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    tasks = [...tasks, newTask];
    return newTask;
  },
  
  // Update task status
  updateTaskStatus: async (taskId: string, status: TaskStatus): Promise<Task> => {
    await delay(500);
    
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      status,
      updatedAt: new Date(),
    };
    
    tasks = [
      ...tasks.slice(0, taskIndex),
      updatedTask,
      ...tasks.slice(taskIndex + 1),
    ];
    
    return updatedTask;
  },
  
  // Get all buildings (for selecting in the form)
  getAllBuildings: async (): Promise<Building[]> => {
    await delay(200);
    return [...mockBuildings];
  },
  
  // Get all users (for selecting in the form)
  getAllUsers: async (): Promise<User[]> => {
    await delay(200);
    return [...mockUsers];
  },
  
  // Delete a task (added for completeness)
  deleteTask: async (taskId: string): Promise<void> => {
    await delay(500);
    tasks = tasks.filter(task => task.id !== taskId);
  },
};
