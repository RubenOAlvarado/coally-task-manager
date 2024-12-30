import { useTasks } from "../context/TaskContext";
import { TaskListProps } from "../interfaces/TaskListProps";

const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
    const { tasks, deleteTask, completeTask } = useTasks();

    return (
        <div className="space-y-4">
            {tasks.map(({ id, title, description, isCompleted, createdAt}) => (
                <div key={id} className="p-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                    <p className="text-xs text-gray-500">{ (createdAt instanceof Date) ? createdAt.toLocaleDateString() : new Date(createdAt).toLocaleDateString() }</p>
                    <div className="mt-2 flex justify-between">
                        <button
                            onClick={() => {
                                console.log('Completing task:', id);
                                completeTask(id)
                            }}
                            className={`px-3 py-1 rounded ${
                                isCompleted
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-300'
                              }`}
                        >
                            {isCompleted ? 'Completed' : 'Mark as Completed'}
                        </button>
                        <div className="space-x-2">
                            <button
                                onClick={() => onEditTask(id)}
                                className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTask(id)}
                                className="px-4 py-2 bg-red-500 text-white rounded shadow"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;