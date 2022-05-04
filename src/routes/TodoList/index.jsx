import { useState } from 'react'
import styles from './TodoList.module.scss'
import TodoItem from '../TodoItem'
import { Link } from 'react-router-dom'
import { useTodoState } from '../TodoContext'

export default function TodoList() {
  const todos = useTodoState()
  const [todoList, setTodoList] = useState(todos)

  const handleToggle = (e) => {
    const { dataset } = e.currentTarget
    const { id } = dataset
    setTodoList((prev) => prev.map((todo) => (todo.id === Number(id) ? { ...todo, done: !todo.done } : todo)))
  }

  return (
    <div className={styles.todoList}>
      <ul>
        <p className={styles.tasksTitle}>Today&apos;s</p>
        {todoList.map(({ id, title, done }) => (
          <TodoItem key={`item-${id}`} id={id} title={title} done={done} onChange={handleToggle} />
        ))}
      </ul>
      <Link to='/todo-create' className={styles.addButton} aria-label='Move Create Page' />
    </div>
  )
}
