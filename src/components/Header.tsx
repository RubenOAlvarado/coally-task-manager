import { TaskStatus } from "../enums/TaskStatus";
import { HeaderProps } from "../interfaces/HeaderProps";
import { BiPlus } from "react-icons/bi";

const Header: React.FC<HeaderProps> = ({ currentFilter, onFilterChange, onAddTask }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <nav className="p-1 bg-gray-100/80 rounded-lg shadow-inner">
            <div className="flex space-x-1">
                {[
                    { id: TaskStatus.All, label: 'All' },
                    { id: TaskStatus.Completed, label: 'Completed' },
                    { id: TaskStatus.Pending, label: 'Pending' }
                ].map(({ id, label }) => (
                    <button
                        key={id}
                        onClick={() => onFilterChange(id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                            ${currentFilter === id 
                            ? 'bg-white text-gray-800 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
          </nav>

          <button
                onClick={onAddTask}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-blue-700 
                transition-all duration-200 font-medium text-sm"
            >
                <BiPlus size={18} />
                Add Task
            </button>
        </div>
      );
};
export default Header;