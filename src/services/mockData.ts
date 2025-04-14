
import { Building, Task, TaskStatus, User } from "@/types/task";
import { addDays, subDays } from "date-fns";

// Mock Users
export const mockUsers: User[] = [
  { id: "user-1", name: "John Doe" },
  { id: "user-2", name: "Jane Smith" },
  { id: "user-3", name: "Bob Johnson" },
  { id: "user-4", name: "Alice Williams" },
];

// Mock Buildings
export const mockBuildings: Building[] = [
  { id: "building-1", name: "Central Plaza" },
  { id: "building-2", name: "Riverfront Tower" },
  { id: "building-3", name: "Parkview Residences" },
  { id: "building-4", name: "Sunset Apartments" },
];

// Generate mock tasks
const today = new Date();

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Inspect fire extinguishers",
    assignedUser: mockUsers[0],
    status: "To Do",
    dueDate: addDays(today, 5),
    buildingId: "building-1",
    building: mockBuildings[0],
    createdAt: subDays(today, 3),
    updatedAt: subDays(today, 3),
  },
  {
    id: "task-2",
    title: "Fix leaking pipe in apartment 304",
    assignedUser: mockUsers[1],
    status: "In Progress",
    dueDate: addDays(today, 1),
    buildingId: "building-1",
    building: mockBuildings[0],
    createdAt: subDays(today, 2),
    updatedAt: subDays(today, 1),
  },
  {
    id: "task-3",
    title: "Replace lobby light fixtures",
    assignedUser: mockUsers[2],
    status: "Complete",
    dueDate: subDays(today, 1),
    buildingId: "building-2",
    building: mockBuildings[1],
    createdAt: subDays(today, 5),
    updatedAt: subDays(today, 0),
  },
  {
    id: "task-4",
    title: "Check HVAC system maintenance",
    assignedUser: mockUsers[0],
    status: "To Do",
    dueDate: addDays(today, 10),
    buildingId: "building-2",
    building: mockBuildings[1],
    createdAt: subDays(today, 1),
    updatedAt: subDays(today, 1),
  },
  {
    id: "task-5",
    title: "Clean swimming pool area",
    assignedUser: mockUsers[3],
    status: "In Progress",
    dueDate: addDays(today, 0),
    buildingId: "building-3",
    building: mockBuildings[2],
    createdAt: subDays(today, 3),
    updatedAt: subDays(today, 1),
  },
  {
    id: "task-6",
    title: "Repaint parking lot lines",
    assignedUser: mockUsers[2],
    status: "To Do",
    dueDate: addDays(today, 7),
    buildingId: "building-3",
    building: mockBuildings[2],
    createdAt: subDays(today, 2),
    updatedAt: subDays(today, 2),
  },
  {
    id: "task-7",
    title: "Replace broken window in unit 205",
    assignedUser: mockUsers[1],
    status: "Complete",
    dueDate: subDays(today, 2),
    buildingId: "building-4",
    building: mockBuildings[3],
    createdAt: subDays(today, 7),
    updatedAt: subDays(today, 3),
  },
  {
    id: "task-8",
    title: "Update security camera system",
    assignedUser: mockUsers[0],
    status: "In Progress",
    dueDate: addDays(today, 3),
    buildingId: "building-4",
    building: mockBuildings[3],
    createdAt: subDays(today, 4),
    updatedAt: subDays(today, 1),
  },
];
