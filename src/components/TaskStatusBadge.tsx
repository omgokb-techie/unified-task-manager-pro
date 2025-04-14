
import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types/task";
import { isPast } from "date-fns";

interface TaskStatusBadgeProps {
  status: TaskStatus;
  dueDate?: Date;
  className?: string;
}

export function TaskStatusBadge({ status, dueDate, className }: TaskStatusBadgeProps) {
  // Check if the task is overdue
  const isOverdue = dueDate && status !== "Complete" && isPast(dueDate);
  
  return (
    <div
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-status-todo text-gray-700": status === "To Do" && !isOverdue,
          "bg-status-in-progress text-white": status === "In Progress" && !isOverdue,
          "bg-status-complete text-white": status === "Complete",
          "bg-status-overdue text-white": isOverdue,
        },
        className
      )}
    >
      {isOverdue ? "Overdue" : status}
    </div>
  );
}
