import { FiCheck, FiTrash2, FiEdit2 } from "react-icons/fi";
import { TaskItemProps } from "../interfaces/TaskItemProps";
import { useTasks } from "../context/TaskContext";
import { motion } from "framer-motion";

const TaskItem: React.FC<TaskItemProps> = ({ task, onEditTask }) => {
    const { deleteTask, completeTask } = useTasks();
    const { id, title, description, isCompleted, createdAt } = task;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md hover:bg-gray-100 transition"
      >
        <div className="flex items-center space-x-3 flex-grow">
            <button
            onClick={() => completeTask(id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isCompleted 
                    ? 'bg-blue-500 border-blue-500 hover:bg-blue-600' 
                    : 'border-gray-300 hover:border-blue-500'
                }`}
            >
            {isCompleted && <FiCheck className="text-white" />}
            </button>
    
            <div className="flex-grow min-w-0">
                <h3 className={`text-base font-medium mb-0.5 truncate ${
                    isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'
                    }`
                }>
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-gray-500 mb-0.5 line-clamp-2">
                    {description}
                    </p>
                )}
                <time className="text-xs text-gray-400">
                    {new Date(createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    })}
                </time>
            </div>
        </div>
  
        <div className="flex space-x-2">
          {!isCompleted && (
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onEditTask(id)}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                aria-label="Edit task"
            >
                <FiEdit2 size={18} />
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => deleteTask(id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Delete task"
          >
            <FiTrash2 size={18} />
          </motion.button>
        </div>
      </motion.div>
    );
  };
  
  export default TaskItem;