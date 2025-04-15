import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { socket } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useToast } from "./hooks/use-toast";
import { Task } from "./types/task";

const queryClient = new QueryClient();

const App = () => {
  const { toast } = useToast();
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("task:upcoming", (tasks: Task[]) => {
      const taskCount = tasks.length;
      const taskTitles = tasks.map(task => task.title).join(", ");
      const dueDate = tasks[0]?.dueDate ? new Date(tasks[0].dueDate).toLocaleDateString() : 'soon';
      
      toast({
        title: `📅 ${taskCount} ${taskCount === 1 ? 'Task' : 'Tasks'} Due Soon`,
        description: (
          <div className="space-y-1">
            <p>{taskTitles}</p>
            <p className="text-sm text-muted-foreground">Due on: {dueDate}</p>
          </div>
        ),
      });
    });

    socket.on("task:overdue", (tasks: Task[]) => {
      const taskCount = tasks.length;
      const taskTitles = tasks.map(task => task.title).join(", ");
      const dueDate = tasks[0]?.dueDate ? new Date(tasks[0].dueDate).toLocaleDateString() : 'previously';
      
      toast({
        title: `⚠️ ${taskCount} ${taskCount === 1 ? 'Task' : 'Tasks'} Overdue`,
        description: (
          <div className="space-y-1">
            <p>{taskTitles}</p>
            <p className="text-sm text-muted-foreground">Was due on: {dueDate}</p>
          </div>
        ),
        variant: "destructive",
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
