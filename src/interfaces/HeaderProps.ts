import { TaskStatus } from "../enums/TaskStatus";

export interface HeaderProps {
    currentFilter: TaskStatus;
    onFilterChange: (filter: TaskStatus) => void;
    onAddTask: () => void;
}