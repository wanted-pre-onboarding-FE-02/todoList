import { useEffect, useState } from 'react'
import styles from './TodoApp.module.scss'
import { INITIAL_TODO } from 'assets/Variables'
import { PlusIcon } from 'assets/svgs/index'
import { compareDate } from 'utils'

import useTodos from 'hooks/useTodos'
import useTodoDate from 'hooks/useTodoDate'
import TodoList from 'pages/TodoList'
import TodoHeader from 'pages/TodoHeader'
import TodoCategory from 'pages/TodoCategory'
import TodoDate from 'pages/TodoDate'
import TodoUpdate from 'pages/TodoUpdate'
import TodoCreate from 'pages/TodoCreate'

export default function TodoApp() {
  const {
    todos,
    copyTodos,
    setTodos,
    setTodoToUpdate,
    setEditedObj,
    handleToggle,
    handleRemove,
    handleAddTodo,
    handleUpdateTodo,
  } = useTodos()
  const { date, ...handleDate } = useTodoDate()
  const [category, setCategory] = useState('work')

  const [filterActive, setFilterActive] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setTodos((todos) =>
      todos.map((todo) => (compareDate(todo.date, date) ? { ...todo, invisible: false } : { ...todo, invisible: true }))
    )

    setTodos((prev) => {
      const fixedTodos = prev.filter((ele) => ele.isLike === true)
      const remainTodos = prev.filter((ele) => ele.isLike === false)
      return fixedTodos.concat(remainTodos)
    })
  }, [date])

  const handleToggle = (e) => {
    const CHECK_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) =>
      todos.map((todo) => (todo.id === CHECK_ID ? { ...todo, done: !todo.done, isLike: false } : todo))
    )
    setCopyTodos((todos) =>
      todos.map((todo) => (todo.id === CHECK_ID ? { ...todo, done: !todo.done, isLike: false } : todo))
    )
  }

  const handleRemove = (e) => {
    const DELETE_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.filter((todo) => todo.id !== DELETE_ID))
    setCopyTodos((todos) => todos.filter((todo) => todo.id !== DELETE_ID))
  }

  const handleModal = () => {
    if (isEditing) setIsEditing((prev) => !prev)
    if (isUpdate) setIsUpdate(false)
    if (isCreate) setIsUpdate(false)
  }

  const handleSaveCategory = (category) => setCategory(category)

  const handleAddTodo = () => {
    if (!editedObj) {
      setIsCreate(true)
      return
    }

    setTodos((prev) => [
      {
        id: Date.now(),
        done: false,
        invisible: false,
        ...editedObj,
      },
      ...prev,
    ])

    setCopyTodos((prev) => [
      {
        id: Date.now(),
        done: false,
        invisible: false,
        ...editedObj,
      },
      ...prev,
    ])

    setIsEditing(false)
    setIsCreate(false)
    setEditedObj(null)
  }

  const handleUpdateTodo = () => {
    setTodos((todos) => todos.map((todo) => (todo.id === todoToUpdate.id ? { ...todo, ...editedObj } : todo)))
    setIsUpdate(false)
    setIsEditing(false)
  }

  const handleEditMode = (e, todo) => {
    setIsEditing((prev) => !prev)
    setIsUpdate(true)
    setTodoToUpdate(todo)
  }

  const handleSearchTodo = (e) => {
    const textFilter = e.currentTarget.value

    if (textFilter.length === 0) {
      setFilterActive(false)
      setCopyTodos(todos)
    } else {
      setFilterActive(true)
      const filterResult = todos.filter((todo) => todo.text.toUpperCase().includes(textFilter.toUpperCase()))

      setCopyTodos(filterResult)
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

  const { handleCalChange } = handleDate
  return (
    <div className={styles.todoWrapper}>
      <div className={styles.todoContent}>
        <TodoHeader handleSearchTodo={handleSearchTodo} />
        <TodoCategory handleCategory={handleCategory} todos={todos} />
        <TodoDate date={date} {...handleDate} />
        <TodoList
          isFilterActive={filterActive}
          todos={todos}
          copyTodos={copyTodos}
          handleToggle={handleToggle}
          handleEditMode={handleEditMode}
          handleRemove={handleRemove}
        />
        {isEditing ? (
          <button type='button' className={styles.todoAddBtn} aria-label='Edit Todo Button' onClick={handleUpdateTodo}>
            ✏️
          </button>
        ) : (
          <button type='button' className={styles.todoAddBtn} aria-label='Add Todo Button' onClick={handleAddTodo}>
            <PlusIcon />
          </button>
        )}
      </div>
      {isUpdate && (
        <TodoUpdate
          todo={todoToUpdate}
          setEditedObj={setEditedObj}
          handleModal={handleModal}
          handleCalChange={handleCalChange}
          handleSaveCategory={handleSaveCategory}
        />
      )}
      {isCreate && (
        <TodoCreate
          propsCategory={category}
          propDate={date}
          setEditedObj={setEditedObj}
          handleModal={handleModal}
          handleCalChange={handleCalChange}
          handleSaveCategory={handleSaveCategory}
        />
      )}
    </div>
  )
}
