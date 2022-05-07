import { useCallback, useState, useEffect } from 'react'
import { changeYMD } from 'utils'
import { INITIAL_TODO } from 'assets/Variables'
import { PlusIcon } from 'assets/svgs/index'
import styles from './TodoApp.module.scss'

import TodoList from 'pages/TodoList'
import TodoHeader from 'pages/TodoHeader'
import TodoCategory from 'pages/TodoCategory'
import TodoDate from 'pages/TodoDate'
import TodoInput from 'pages/TodoInput'
import useTodoDate from 'hooks/useTodoDate'

export default function TodoApp() {
  const [todos, setTodos] = useState([...INITIAL_TODO])
  const [text, setText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selected, setSelected] = useState(0)
  const [date, setDateFunObj] = useTodoDate()

  useEffect(() => {
    const dateStr = changeYMD(date)
    setTodos((prev) => prev.filter((todo) => todo.dateStr === dateStr))
  }, [date])

  const handleToggle = (e) => {
    const CHECK_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.map((todo) => (todo.id === CHECK_ID ? { ...todo, done: !todo.done } : todo)))
  }

  const handleRemove = (e) => {
    const DELETE_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.filter((todo) => todo.id !== DELETE_ID))
  }

  const handleChangeText = (e) => {
    setText(e.currentTarget.value)
  }

  const handleModal = () => {
    setIsVisible((prev) => !prev)
    setText('')
    if (isEditing) setIsEditing((prev) => !prev)
  }

  const handleAddTodo = useCallback(() => {
    if (text.trim() === '') {
      setIsVisible((prev) => !prev)
      return
    }

    const dateStr = changeYMD(date)
    setTodos((prev) => [
      {
        id: Date.now(),
        text: text.trim(),
        dateStr,
        category: 'green',
        done: false,
        isLike: false,
      },
      ...prev,
    ])
    setText('')
    setIsVisible((prev) => !prev)
  }, [date, text])

  const handleEditMode = (e) => {
    setIsEditing((prev) => !prev)
    const EDIT_ID = parseInt(e.target.dataset.id, 10)
    setSelected(EDIT_ID)
    setIsVisible((prev) => !prev)
    const newText = todos.find((element) => element.id === EDIT_ID).text
    setText(newText)
  }

  const handleEditTodo = () => {
    setTodos((todos) => todos.map((todo) => (todo.id === selected ? { ...todo, text } : todo)))
    setIsEditing(false)
    setIsVisible((prev) => !prev)
    setText('')
  }
  const { handleCalChange } = setDateFunObj
  return (
    <div className={styles.todoWrapper}>
      <div className={styles.todoContent}>
        <TodoHeader />
        <TodoCategory />
        <TodoDate date={date} {...setDateFunObj} />
        <TodoList
          todos={todos}
          handleToggle={handleToggle}
          handleEditMode={handleEditMode}
          handleRemove={handleRemove}
        />
        {isEditing ? (
          <button type='button' className={styles.todoAddBtn} aria-label='Edit Todo Button' onClick={handleEditTodo}>
            ✏️
          </button>
        ) : (
          <button type='button' className={styles.todoAddBtn} aria-label='Add Todo Button' onClick={handleAddTodo}>
            <PlusIcon />
          </button>
        )}
      </div>
      {isVisible && (
        <TodoInput
          text={text}
          date={date}
          handleChangeText={handleChangeText}
          handleModal={handleModal}
          handleCalChange={handleCalChange}
        />
      )}
    </div>
  )
}
