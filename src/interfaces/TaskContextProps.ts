import { Task } from "../types/task";

export interface TaskContextProps {
    tasks: Task[];
    fetchTasks: (status?: 'completed' | 'pending') => Promise<void>;
    createTask: (title: string, description?: string) => Promise<void>;
    updateTask: (id: string, task: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    completeTask: (id: string) => Promise<void>;
    fetchTaskById: (id: string) => Promise<Task>;
};