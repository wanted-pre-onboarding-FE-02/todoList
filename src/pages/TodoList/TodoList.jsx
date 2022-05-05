import { useState } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon, CloseButton, BinButton, HamburgerButton, SearchButton, AlarmButton } from '../../assets/svgs'

const INIT_TODO = [
  {
    id: 0,
    title: '많이 도와주세요 ㅠㅠ',
    done: false,
  },
  {
    id: 1,
    title: '2조 최고!!',
    done: false,
  },
]

function TodoList() {
  const [todoList, setTodoList] = useState(INIT_TODO)
  const [createToggle, setCreateToggle] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const handleAddClick = () => {
    setCreateToggle((prev) => !prev)
  }

  const handleCreateClick = () => {
    if (!newTitle) return
    setTodoList((prev) => {
      const newList = [
        {
          id: prev.length,
          title: newTitle,
          done: false,
        },
      ].concat([...prev])
      return newList
    })
    setCreateToggle((prev) => !prev)
    setNewTitle('')
  }

  const handleDeleteClick = (e) => {
    const { dataset } = e.currentTarget
    const { id } = dataset
    setTodoList((prev) => prev.filter((todo) => todo.id !== Number(id)))
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

  const handleChangeTitle = (e) => {
    setNewTitle(e.currentTarget.value)
  }

  return (
    <div className={styles.todoList}>
      {createToggle && (
        <>
          <CloseButton className={styles.closeButton} onClick={handleAddClick} />
          <form className={styles.createTodo}>
            <input type='text' placeholder='Enter new task' onChange={handleChangeTitle} />
            <button type='button' className={styles.createButton} onClick={handleCreateClick}>
              New task ⌃
            </button>
          </form>
        </>
      )}
      {createToggle || (
        <>
          <HamburgerButton className={styles.hamburgerButton} />
          <SearchButton className={styles.searchButton} />
          <AlarmButton className={styles.alarmButton} />
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
                    <p className={todo.done ? styles.checkedTitle : styles.title}>{todo.title}</p>
                    <button type='button' data-id={todo.id} onClick={handleDeleteClick}>
                      <BinButton />
                    </button>
                  </li>
                ))}
              </div>
            </ul>
            <button type='button' className={styles.addButton} onClick={handleAddClick} aria-label='Add button' />
          </div>
        </>
      )}
    </div>
  )
}

export default TodoList
