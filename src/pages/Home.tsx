import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

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

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Task Manager</h1>

            {!isFormVisible && (
            <div className="mb-4 text-right">
                <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                >
                Add Task
                </button>
            </div>
            )}

            {isFormVisible ? (
            <TaskForm taskId={editingTaskId || undefined} onClose={handleCloseForm} />
            ) : (
            <TaskList onEditTask={handleEditTask} />
            )}
        </div>
    );
}