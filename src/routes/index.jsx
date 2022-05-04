import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'
import TodoList from './TodoList'
import TodoCreate from './TodoCreate'
import TodoUpdate from './TodoUpdate'
import { TodoProvider } from './TodoContext'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.phone}>
        <TodoProvider>
          <Routes>
            <Route path='/' element={<TodoList />} />
            <Route path='/todo-create' element={<TodoCreate />} />
            <Route path='/todo-update' element={<TodoUpdate />} />
          </Routes>
        </TodoProvider>
      </div>
    </div>
  )
}

export default App
