import { Task } from "../types/task";

export interface TaskItemProps {
    task: Task;
    onEditTask: (id: string) => void;
}