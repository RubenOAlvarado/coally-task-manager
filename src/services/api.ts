import axios from "axios";
import { Task } from "../types/task";

const api = axios.create({
  baseURL: "https://coally-api-production.up.railway.app/api/v1",
});

export const fetchTasks = async (status?: 'completed' | 'pending' ): Promise<Task[]> => {
  const params = status ? { status } : {};
  const response = await api.get("/tasks", { params });
  return response.data;
};

export const createTask = async (task: Partial<Task>): Promise<number> => {
  const response = await api.post("/tasks", task);
  return response.status;
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<number> => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.status;
}

export const deleteTask = async (id: string): Promise<number> => {
  const response = await api.delete(`/tasks/${id}`);
  return response.status;
}

export const completeTask = async (id: string): Promise<number> => {
    const response = await api.patch(`/tasks/${id}/complete`);
    return response.status;
}

export const fetchTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};