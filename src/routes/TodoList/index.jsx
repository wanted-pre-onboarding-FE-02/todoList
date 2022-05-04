import { useState } from 'react'
import styles from './TodoList.module.scss'
import TodoItem from '../TodoItem'

const DATA_LIST = [
  {
    id: 0,
    title: 'Todo 완성하기1',
    done: false,
  },
  {
    id: 1,
    title: 'Todo 완성하기2',
    done: false,
  },
  {
    id: 2,
    title: 'Todo 완성하기3',
    done: false,
  },
  {
    id: 3,
    title: 'Todo 완성하기4',
    done: true,
  },
]

export default function TodoList() {
  const [todoList, setTodoList] = useState(DATA_LIST)

  const handleAddClick = (e) => {
    // console.log('handleAddClick')
  }

  const handleToggle = (e) => {
    const { dataset } = e.currentTarget
    const { id } = dataset
    setTodoList((prev) => prev.map((todo) => (todo.id === Number(id) ? { ...todo, done: !todo.done } : todo)))
  }

  return (
    <div className={styles.todoList}>
      <ul className={styles.tasks}>
        <p className={styles.tasksTitle}>Today&apos;s</p>
        {todoList.map(({ id, title, done }) => (
          <TodoItem key={`item-${id}`} id={id} title={title} done={done} onChange={handleToggle} />
        ))}
      </ul>
      <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
    </div>
  )
}
