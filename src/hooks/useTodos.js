import { useState } from 'react'
import { INITIAL_TODO } from 'assets/Variables'

const useTodos = () => {
  const [todos, setTodos] = useState([...INITIAL_TODO])
  const [copyTodos, setCopyTodos] = useState(todos)
  const [todoToUpdate, setTodoToUpdate] = useState(null)
  const [editedObj, setEditedObj] = useState(null)

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

  const handleAddTodo = () => {
    if (!editedObj) {
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

    setEditedObj(null)
  }

  const handleUpdateTodo = () => {
    setTodos((todos) => todos.map((todo) => (todo.id === todoToUpdate.id ? { ...todo, ...editedObj } : todo)))
  }

  const state = { todos, copyTodos }
  const funObj = {
    setTodos,
    setTodoToUpdate,
    setEditedObj,
    handleToggle,
    handleRemove,
    handleAddTodo,
    handleUpdateTodo,
  }
  return { ...state, ...funObj }
}

export default useTodos
