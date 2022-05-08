import { useCallback, useEffect, useState } from 'react'
import styles from './TodoApp.module.scss'
import { INITIAL_TODO } from 'assets/Variables'
import { PlusIcon } from 'assets/svgs/index'
import { changeYMD } from 'utils'

import TodoList from 'pages/TodoList'
import TodoHeader from 'pages/TodoHeader'
import TodoCategory from 'pages/TodoCategory'
import TodoDate from 'pages/TodoDate'
import TodoInput from 'pages/TodoInput'
import useTodoDate from 'hooks/useTodoDate'
import { createFuzzyMatcher } from 'utils/createFuzzyMatcher'

export default function TodoApp() {
  const [todos, setTodos] = useState([...INITIAL_TODO])
  const [copyTodos, setCopyTodos] = useState(todos)
  const [filterActive, setFilterActive] = useState(false)
  const [text, setText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selected, setSelected] = useState(0)
  const [category, setCategory] = useState('work')
  const [todoCategory, setTodoCategory] = useState('')
  const [todoIsLike, setTodoIsLike] = useState(false)
  const [date, setDateFunObj] = useTodoDate()

  // 중요표시 할일 상단고정
  useEffect(() => {
    setTodos((prev) => {
      const fixedTodos = prev.filter((ele) => ele.isLike === true)
      const remainTodos = prev.filter((ele) => ele.isLike === false)
      return fixedTodos.concat(remainTodos)
    })
  }, [text])

  useEffect(() => {
    const dateStr = changeYMD(date)
    setTodos((todos) =>
      todos.map((todo) => (todo.dateStr === dateStr ? { ...todo, invisible: false } : { ...todo, invisible: true }))
    )
  }, [date])

  const handleToggle = (e) => {
    const CHECK_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.map((todo) => (todo.id === CHECK_ID ? { ...todo, done: !todo.done } : todo)))
    setCopyTodos((todos) => todos.map((todo) => (todo.id === CHECK_ID ? { ...todo, done: !todo.done } : todo)))
  }

  const handleRemove = (e) => {
    const DELETE_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.filter((todo) => todo.id !== DELETE_ID))
    setCopyTodos((todos) => todos.filter((todo) => todo.id !== DELETE_ID))
  }

  const handleChangeText = (e) => {
    setText(e.currentTarget.value)
  }

  const handleModal = () => {
    setIsVisible((prev) => !prev)
    setText('')
    if (isEditing) setIsEditing((prev) => !prev)
  }

  const handleSaveCategory = (category) => {
    setCategory(category)
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
        category,
        done: false,
        isLike: todoIsLike,
        invisible: false,
      },
      ...prev,
    ])
    setCopyTodos((prev) => [
      {
        id: Date.now(),
        text: text.trim(),
        dateStr,
        category,
        done: false,
        isLike: todoIsLike,
        invisible: false,
      },
      ...prev,
    ])
    setText('')
    setIsVisible((prev) => !prev)
  }, [category, text, todoIsLike])

  const handleEditMode = (e, todo) => {
    setTodoCategory(todo.category)
    setIsEditing((prev) => !prev)
    const EDIT_ID = parseInt(e.target.dataset.id, 10)
    setSelected(EDIT_ID)
    setIsVisible((prev) => !prev)
    const newText = todos.find((element) => element.id === EDIT_ID).text
    setText(newText)
    setTodoIsLike(todo.isLike)
  }

  const handleToggleLike = (e, todo) => {
    setTodoIsLike(todo.isLike)
  }

  const handleEditTodo = () => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === selected ? { ...todo, text, category, isLike: todoIsLike } : todo))
    )
    setIsEditing(false)
    setIsVisible((prev) => !prev)
    setText('')
  }

  const handleLike = () => {
    setTodoIsLike((prev) => !prev)
  }

  const handleSearchTodo = (e) => {

    const textFilter = e.currentTarget.value
    if (textFilter.length === 0) {
      setFilterActive(false)
      setCopyTodos(todos)
    }

    else {
      setFilterActive(true)
      if (/[ㄱ-힣]/.test(textFilter)) {
        const regex = createFuzzyMatcher(textFilter)
        const resultData = todos.filter(row => {
          return regex.test(row.text)
        })
        setCopyTodos(resultData)
      }

      else {
        const filterResult = todos.filter(todo =>
          todo.text.toUpperCase().includes(textFilter.toUpperCase())
        )
        setCopyTodos(filterResult)
      }
    }
  }

  const handleCategory = ({ currentTarget }) => {
    const category = currentTarget.value
    if (category === 'all') {
      setTodos((todos) => todos.map((todo) => ({ ...todo, invisible: false })))
      return
    }
    if (category) {
      setTodos((todos) =>
        todos.map((todo) => (todo.category === category ? { ...todo, invisible: false } : { ...todo, invisible: true }))
      )
    }
  }

  const { handleCalChange } = setDateFunObj
  return (
    <div className={styles.todoWrapper}>
      <div className={styles.todoContent}>
        <TodoHeader handleSearchTodo={handleSearchTodo} />
        <TodoCategory handleCategory={handleCategory} todos={todos} />
        <TodoDate date={date} {...setDateFunObj} />
        <TodoList
          todoIsLike={todoIsLike}
          isFilterActive={filterActive}
          todos={todos}
          copyTodos={copyTodos}
          handleToggle={handleToggle}
          handleToggleLike={handleToggleLike}
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
          todoCategory={todoCategory}
          todoIsLike={todoIsLike}
          handleLike={handleLike}
          handleChangeText={handleChangeText}
          handleModal={handleModal}
          handleCalChange={handleCalChange}
          handleSaveCategory={handleSaveCategory}
        />
      )}
    </div>
  )
}
