
import { useEffect, useState } from "react";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { TaskCard } from "@/components/TaskCard";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskReminders } from "@/components/TaskReminders";
import { TaskService } from "@/services/taskService";
import { Building, Task, User } from "@/types/task";
import { useToast } from "@/components/ui/use-toast";

function Index() {
  // State for tasks, users, buildings, and filters
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [taskReminders, setTaskReminders] = useState<Task[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoading(true);
        
        // Load tasks, users, and buildings
        const [tasksData, usersData, buildingsData, reminderTasks] = await Promise.all([
          TaskService.getAllTasks(),
          TaskService.getAllUsers(),
          TaskService.getAllBuildings(),
          TaskService.getTasksNeedingReminders(),
        ]);
        
        setTasks(tasksData);
        setFilteredTasks(tasksData);
        setUsers(usersData);
        setBuildings(buildingsData);
        setTaskReminders(reminderTasks);
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "There was an error loading the task data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    loadInitialData();
  }, [toast]);

  // Apply filters when tasks, selectedUserId, or selectedBuildingId change
  useEffect(() => {
    let result = [...tasks];
    
    if (selectedUserId) {
      result = result.filter((task) => task.assignedUser.id === selectedUserId);
    }
    
    if (selectedBuildingId) {
      result = result.filter((task) => task.buildingId === selectedBuildingId);
    }
    
    setFilteredTasks(result);
  }, [tasks, selectedUserId, selectedBuildingId]);

  // Handler for user filter change
  const handleUserFilterChange = (userId: string | null) => {
    setSelectedUserId(userId);
  };

  // Handler for building filter change
  const handleBuildingFilterChange = (buildingId: string | null) => {
    setSelectedBuildingId(buildingId);
  };

  // Handler for clearing filters
  const handleClearFilters = () => {
    setSelectedUserId(null);
    setSelectedBuildingId(null);
  };

  // Handler for task creation
  const handleTaskCreated = async () => {
    try {
      const updatedTasks = await TaskService.getAllTasks();
      setTasks(updatedTasks);
      
      // Refresh reminders
      const reminderTasks = await TaskService.getTasksNeedingReminders();
      setTaskReminders(reminderTasks);
    } catch (error) {
      toast({
        title: "Error refreshing tasks",
        description: "There was an error refreshing the task list.",
        variant: "destructive",
      });
    }
  };

  // Handler for task update
  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Task Management</h1>
        <p className="text-muted-foreground">
          Create, assign, and track tasks for your buildings and properties
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters and actions row */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <TaskFilters
              users={users}
              buildings={buildings}
              selectedUserId={selectedUserId}
              selectedBuildingId={selectedBuildingId}
              onUserChange={handleUserFilterChange}
              onBuildingChange={handleBuildingFilterChange}
              onClearFilters={handleClearFilters}
            />
            <CreateTaskForm 
              onTaskCreated={handleTaskCreated}
              users={users}
              buildings={buildings}
            />
          </div>
          
          {/* Tasks grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index} 
                  className="h-[200px] bg-muted rounded-md animate-pulse"
                />
              ))}
            </div>
          ) : filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onTaskUpdated={handleTaskUpdated}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No tasks found</h3>
              <p className="text-muted-foreground">
                {selectedUserId || selectedBuildingId
                  ? "Try changing your filters or create a new task"
                  : "Create your first task to get started"}
              </p>
            </div>
          )}
        </div>
        
        {/* Sidebar with reminders */}
        <div className="lg:col-span-1">
          <TaskReminders tasks={taskReminders} />
        </div>
      </div>
    </div>
  );
}

export default Index;
