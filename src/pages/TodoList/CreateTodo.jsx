import { useState } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon } from '../../assets/svgs'

const INIT_TODO = []

function TodoList() {
  const [todoList, setTodoList] = useState(INIT_TODO)

  const handleAddClick = () => {
    setTodoList((prev) => {
      const newList = [...prev].concat({
        id: prev.length + 1,
        title: `힘들어요${prev.length + 1}`,
        done: false,
      })
      return newList
    })
  }

  const handleChange = (e) => {
    const { dataset, checked } = e.currentTarget
    const { id } = dataset

    setTodoList((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === Number(id))
      const newList = [...prev]
      newList[targetIndex].done = checked
      return newList
    })
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.centering}>
        <h1>What&apos;s up, Joy!</h1>
        <ul className={styles.tasks}>
          <p className={styles.tasksTitle}>Today&apos;s</p>
          <div className={styles.tasksWrapper}>
            {todoList.map((todo) => (
              <li key={`todo-${todo.id}`} className={styles.task}>
                <div className={styles.checkboxWrapper}>
                  <input type='checkbox' checked={todo.done} data-id={todo.id} onChange={handleChange} />
                  <CheckIcon />
                </div>
                <p className={styles.title}>{todo.title}</p>
              </li>
            ))}
          </div>
        </ul>
        <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
      </div>
    </div>
  )
}

export default TodoList
