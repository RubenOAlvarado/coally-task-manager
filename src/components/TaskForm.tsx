import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskFormProps } from "../interfaces/TaskFormProps";

const TaskForm: React.FC<TaskFormProps> = ({ taskId, onClose }) => {
    const { fetchTasks, createTask, updateTask, fetchTaskById } = useTasks();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (taskId) {
            const loadTask = async () => {
                try {
                    const task = await fetchTaskById(taskId);
                    if(task){
                        setTitle(task.title);
                        setDescription(task.description || '');
                    }
                } catch (error) {
                    console.error('Error loading task', error);
                } finally {
                    setLoading(false);
                }
            };
            loadTask();
        }
    }, [taskId, fetchTasks]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(!title){
            alert('Title is required');
            return;
        }
        setLoading(true);
        try {
            if (taskId) {
                updateTask(taskId, { title, description });
            } else {
                createTask(title, description);
            }
            if(onClose){
                onClose();
            }
        } catch (error) {
            console.error('Error submitting task', error);
        } finally {
            setLoading(false);
        }
     };

     return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">
                {taskId ? 'Edit Task' : 'Add Task'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                        disabled={loading}
                    />
                </div>
                <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="mr-2 px-4 py-2 bg-gray-300 rounded"
                    disabled={loading}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button> 
                </div>
            </form>
        </div>
     );
};

export default TaskForm;