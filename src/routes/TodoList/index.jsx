import styles from './TodoList.module.scss'
import TodoItem from '../TodoItem'
import { Link } from 'react-router-dom'
import { useTodoState } from '../TodoContext'

export default function TodoList() {
  const todos = useTodoState()

  return (
    <div className={styles.todoList}>
      <ul>
        <p className={styles.tasksTitle}>Today&apos;s</p>
        {todos.map(({ id, title, done }) => (
          <TodoItem key={`item-${id}`} id={id} title={title} done={done} />
        ))}
      </ul>
      <Link to='/todo-create' className={styles.addButton} aria-label='Move Create Page' />
    </div>
  )
}
