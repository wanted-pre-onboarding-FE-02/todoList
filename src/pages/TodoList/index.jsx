import { useCallback, useEffect, useState } from 'react'
import styles from './TodoList.module.scss'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

export default function TodoList({ todos, setTodos, handleToggle, handleEditMode, handleRemove }) {
  const [todoList, setTodoList] = useState(todos)
  const [startIndex, setStartIndex] = useState(-2)
  const [nextIndex, setNextIndex] = useState(99)

  const handleDragStart = useCallback(
    (e) => {
      e.stopPropagation()

      setTimeout(() => {
        e.target.style.display = 'none'
        return true
      }, 0)

      const { id } = e.currentTarget

      e.dataTransfer.setData('list_id', id)
      const startIndex = todoList.findIndex((el) => el.id === Number(id))
      setStartIndex(startIndex)
    },
    [todoList]
  )

  const handleDragEnter = useCallback(
    (e) => {
      e.preventDefault()
      const { id } = e.currentTarget

      const nextIndex = todoList.findIndex((el) => el.id === Number(id))
      setNextIndex(nextIndex)
    },
    [todoList]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleDragEnd = useCallback(
    (e) => {
      if (e.target.style.display === 'none') {
        e.target.style.display = 'flex'
      }

      const copiedList = [...todoList]
      const startTodoEl = copiedList[startIndex]
      copiedList.splice(startIndex, 1)

      let nextTarget = nextIndex
      if (nextIndex < startIndex) nextTarget += 1

      copiedList.splice(nextTarget, 0, startTodoEl)
      setNextIndex(99)
      setStartIndex(-2)
      setTodoList(copiedList)
    },
    [todoList, nextIndex, startIndex]
  )

  const handleDrop = useCallback((e) => {
    const id = e.dataTransfer.getData('list_id')
    const list = document.getElementById(id)
    list.style.display = 'flex'
  }, [])

  console.log(todoList)

  return (
    <section className={styles.todoList}>
      <h3>Today&#39;s tasks</h3>
      <ul onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className={styles.todoInner}>
        {todoList.map((todo, index) => (
          <TodoItem
            index={index}
            moveDown={nextIndex < index}
            todo={todo}
            todoList={todoList}
            setTodos={setTodos}
            key={`todo-${todo.id}`}
            handleToggle={handleToggle}
            handleEditMode={handleEditMode}
            handleRemove={handleRemove}
            handleDragEnter={handleDragEnter}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            setTodoList={setTodoList}
          />
        ))}
      </ul>
    </section>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      date: PropTypes.string,
      category: PropTypes.string,
      done: PropTypes.bool,
      isLike: PropTypes.bool,
    })
  ),
  setTodos: PropTypes.func,
  handleToggle: PropTypes.func,
  handleEditMode: PropTypes.func,
  handleRemove: PropTypes.func,
}
