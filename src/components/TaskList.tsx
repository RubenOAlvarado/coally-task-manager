import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import Header from "./Header";
import { TaskStatus } from "../enums/TaskStatus";

const TaskList: React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [currentFilter, setCurrentFilter] = useState<TaskStatus>(TaskStatus.All);

    const { tasks, fetchTasks } = useTasks();

    const handleAddTask = () => {
        setIsFormVisible(true);
        setEditingTaskId(null);
    };

    const handleEditTask = (taskId: string) => {
        setIsFormVisible(true);
        setEditingTaskId(taskId);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
        setEditingTaskId(null);
    }

    const handleFilterChange = async (filter: TaskStatus) => {
        setCurrentFilter(filter);
        await fetchTasks(filter === TaskStatus.All ? undefined : filter);
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>
            <Header currentFilter={currentFilter} onFilterChange={handleFilterChange} onAddTask={handleAddTask} />
            {isFormVisible ? (
                <TaskForm taskId={editingTaskId || undefined} onClose={handleCloseForm} />
                ) : (
                    tasks.map((task) => (
                        <TaskItem key={task.id} task={task} onEditTask={handleEditTask} />
                    ))
                )
            }
        </div>
    );
};

export default TaskList;