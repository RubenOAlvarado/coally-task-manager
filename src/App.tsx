import TaskList from './components/TaskList'
import { TaskProvider } from './context/TaskContext'

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <TaskList />
      </div>
    </TaskProvider>
  )
}

export default App
