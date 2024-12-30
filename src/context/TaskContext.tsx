import { createContext, useContext, useEffect, useState } from "react";
import { TaskContextProps } from "../interfaces/TaskContextProps";
import { Task } from "../types/task";
import { createTask, deleteTask, fetchTaskById, fetchTasks, updateTask, completeTask } from "../services/api";
import { TaskProviderProps } from "../interfaces/TaskProviderProps";

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTasks = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadTasks = async (status?: 'completed' | 'pending') => {
        try {
            const data = await fetchTasks(status);
            setTasks(data);
        } catch (error) {
            console.error('Error loading tasks', error);
        }
    };

    const fetchTask = async (id: string): Promise<Task> => {
        try{
            const task = await fetchTaskById(id);
            if (!task) {
                throw new Error('Task not found');
            }
            return task;
        }catch(error){
            console.error('Error fetching task', error);
            throw error;
        }
    };

    const addTask = async (title: string, description?: string) => {
        try {
            const status = await createTask({ title, description });
            if (status === 201) {
                await loadTasks();
            }
        } catch (error) {
            console.error('Error adding task', error);
        }
    };

    const editTask = async (id: string, task: Partial<Task>) => {
        try {
            const status = await updateTask(id, task);
            if (status === 200) {
                await loadTasks();
            }
        } catch (error) {
            console.error('Error editing task', error);
        }
    };

    const removeTask = async (id: string) => {
        try {
            const status = await deleteTask(id);
            if(status === 204){
                setTasks(tasks.filter(task => task.id !== id));
            }
        } catch (error) {
            console.error('Error removing task', error);
        }
    };

    const completeTaskById = async (id: string) => {
        try {
            const status = await completeTask(id);
            if (status === 204) {
                await loadTasks();
            }
        } catch (error) {
            console.error('Error completing task', error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <TaskContext.Provider value={{
            tasks,
            fetchTasks: loadTasks,
            createTask: addTask,
            updateTask: editTask,
            deleteTask: removeTask,
            completeTask: completeTaskById,
            fetchTaskById: fetchTask
        }}>
            {children}
        </TaskContext.Provider>
    );
};