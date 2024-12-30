import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskFormProps } from "../interfaces/TaskFormProps";
import { BiLoader } from "react-icons/bi";

const TaskForm: React.FC<TaskFormProps> = ({ taskId, onClose }) => {
    const { createTask, updateTask, fetchTaskById } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (taskId) {
            const loadTask = async () => {
                try {
                    setLoading(true);
                    const task = await fetchTaskById(taskId);
                    if(task){
                        setTitle(task.title);
                        setDescription(task.description || '');
                    }
                } catch (error) {
                    console.error('Error loading task', error);
                    setError('Error loading task. Please try again.');
                } finally {
                    setLoading(false);
                }
            };
            loadTask();
        }
    }, [taskId, fetchTaskById]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if(!title){
            setError('Title is required');
            return;
        }
        setLoading(true);
        try {
            if (taskId) {
                updateTask(taskId, { title, description });
            } else {
                createTask(title, description);
            }
            onClose?.();
        } catch (error) {
            setError('Failed to save task. Please try again.');
        } finally {
            setLoading(false);
        }
     };

     return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {taskId ? 'Edit Task' : 'Add Task'}
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
                {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md text-sm transition-colors
                            ${error && !title.trim() 
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200' 
                              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                            } 
                            focus:outline-none focus:ring-2`} 
                        disabled={loading}
                        placeholder="Enter task title"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        disabled={loading}
                        rows={3}
                        placeholder="Add task description (optional)"
                    />
                </div>
                <div className="flex justify-end gap-3 pt-2">
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
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 
                        rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 
                        focus:ring-blue-300 disabled:opacity-50 transition-colors 
                        flex items-center gap-2"
                        disabled={loading}
                    >
                        {loading && <BiLoader className="animate-spin" size={16} />}
                        {loading ? 'Saving...' : taskId ? 'Update Task' : 'Save Task'}
                    </button>
                </div>
            </form>
        </div>
     );
};

export default TaskForm;