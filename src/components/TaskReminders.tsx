
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Task } from "@/types/task";
import { format } from "date-fns";
import { Bell } from "lucide-react";

interface TaskRemindersProps {
  tasks: Task[];
}

export function TaskReminders({ tasks }: TaskRemindersProps) {
  if (tasks.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-muted-foreground">Task Reminders</h3>
      {tasks.map((task) => (
        <Alert key={task.id} variant="default">
          <Bell className="h-4 w-4 mr-2" />
          <AlertTitle className="text-sm font-medium">
            {isPastDue(task.dueDate) ? "Overdue Task" : "Task Due Soon"}
          </AlertTitle>
          <AlertDescription className="text-sm">
            {task.title} - Due {format(task.dueDate, "PPP")}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}

function isPastDue(date: Date): boolean {
  return new Date() > date;
}
