import { useCallback, useState } from 'react'
import styles from './TodoApp.module.scss'
import { INITIAL_TODO } from 'assets/Variables'
import { PlusIcon } from 'assets/svgs/index'
import TodoList from 'pages/TodoList'
import TodoHeader from 'pages/TodoHeader'
import TodoCategory from 'pages/TodoCategory'
import Modal from '../../components/Modal'

export default function TodoApp() {
  const [todos, setTodos] = useState([...INITIAL_TODO])
  const [copyTodos, setCopyTodos] = useState(todos)
  const [filterActive, setFilterActive] = useState(false)
  const [text, setText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selected, setSelected] = useState(0)

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

  const handleAddTodo = useCallback(() => {
    if (text.trim() === '') {
      setIsVisible((prev) => !prev)
      return
    }

    setTodos((prev) => [
      {
        id: Date.now(),
        text: text.trim(),
        date: '2020-05-05',
        category: 'green',
        done: false,
        isLike: false,
        invisible: false,
      },
      ...prev,
    ])
    setCopyTodos((prev) => [
      {
        id: Date.now(),
        text: text.trim(),
        date: '2020-05-05',
        category: 'green',
        done: false,
        isLike: false,
      },
      ...prev,
    ])
    setText('')
    setIsVisible((prev) => !prev)
  }, [text])

  const handleEditMode = (e) => {
    setIsEditing((prev) => !prev)
    const EDIT_ID = parseInt(e.target.dataset.id, 10)
    setSelected(EDIT_ID)
    setIsVisible((prev) => !prev)
    const newText = todos.find((element) => element.id === EDIT_ID).text
    setText(newText)
  }

  const handleEditTodo = () => {
    // if (text.trim() === '') {
    //   return
    // }

    setTodos((todos) => todos.map((todo) => (todo.id === selected ? { ...todo, text } : todo)))
    setCopyTodos((todos) => todos.map((todo) => (todo.id === selected ? { ...todo, text } : todo)))
    setIsEditing(false)
    setIsVisible((prev) => !prev)
    setText('')
  }

  const handleSearchTodo = (e) => {
    const textFilter = e.currentTarget.value
    console.log(textFilter)
    if (textFilter.length === 0) {
      setFilterActive(false)
      setCopyTodos(todos)
    } else {
      setFilterActive(true)
      const filterResult = todos.filter((todo) => todo.text.toUpperCase().includes(textFilter.toUpperCase()))
      console.log(filterResult)
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
  // console.log(isVisible)
  return (
    <div className={styles.todoWrapper}>
      <div className={styles.todoContent}>
        <TodoHeader handleSearchTodo={handleSearchTodo} />
        <TodoCategory handleCategory={handleCategory} todos={todos} />

        <TodoList
          isFilterActive={filterActive}
          todos={todos}
          copyTodos={copyTodos}
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
      {isVisible && <Modal text={text} handleChangeText={handleChangeText} handleModal={handleModal} />}
    </div>
  )
}
