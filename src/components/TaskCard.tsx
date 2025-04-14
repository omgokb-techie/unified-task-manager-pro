
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Task } from "@/types/task";
import { format } from "date-fns";
import { Building, Clock, User } from "lucide-react";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";
import { TaskService } from "@/services/taskService";
import { useToast } from "@/components/ui/use-toast";

interface TaskCardProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
}

export function TaskCard({ task, onTaskUpdated }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  
  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsUpdating(true);
      const updatedTask = await TaskService.updateTaskStatus(
        task.id, 
        newStatus as "To Do" | "In Progress" | "Complete"
      );
      onTaskUpdated(updatedTask);
      toast({
        title: "Task updated",
        description: `Task status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error updating task",
        description: "There was an error updating the task status.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight">{task.title}</h3>
        </div>
        <TaskStatusBadge status={task.status} dueDate={task.dueDate} />
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid gap-2 mt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="mr-1 h-4 w-4" />
            <span>{task.assignedUser.name}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Building className="mr-1 h-4 w-4" />
            <span>{task.building.name}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>Due: {format(task.dueDate, "PPP")}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full">
          <Select
            value={task.status}
            onValueChange={handleStatusChange}
            disabled={isUpdating}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Complete">Complete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
    </Card>
  );
}
