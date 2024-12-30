import { TaskProvider } from './context/TaskContext'
import Home from './pages/Home'

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <Home />
      </div>
    </TaskProvider>
  )
}

export default App
