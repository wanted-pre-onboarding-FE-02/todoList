import { useCallback, useState } from 'react'
import styles from './TodoList.module.scss'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

export default function TodoList({ todos, setTodos, handleToggle, handleEditMode, handleRemove }) {
  const [todoList, setTodoList] = useState(todos)
  const [startId, setStartId] = useState(-1)
  const [nextIndex, setNextIndex] = useState(Number.MAX_SAFE_INTEGER)

  const handleDragStart = useCallback((e) => {
    e.stopPropagation()
    const { id } = e.currentTarget

    e.dataTransfer.setData('list_id', id)
    setTimeout(() => {
      e.target.style.display = 'none'
      return true
    }, 0)

    setStartId(id)
  }, [])

  const handleDragEnter = useCallback(
    (e) => {
      e.preventDefault()
      const { id } = e.currentTarget

      const newNextIndex = todoList.findIndex((el) => el.id === Number(id))
      if (newNextIndex === nextIndex) return

      setNextIndex(newNextIndex)

      const copiedList = [...todoList]
      const startIndex = copiedList.findIndex((el) => el.id === Number(startId))
      const startEl = copiedList.find((el) => el.id === Number(startId))

      copiedList.splice(startIndex, 1)
      copiedList.splice(newNextIndex, 0, startEl)
      setTodoList(copiedList)
    },
    [todoList, startId, nextIndex]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleDragEnd = useCallback((e) => {
    if (e.target.style.display === 'none') {
      e.target.style.display = 'flex'
    }

    setNextIndex(Number.MAX_SAFE_INTEGER)
    setStartId(-1)
  }, [])

  const handleDrop = useCallback((e) => {
    const id = e.dataTransfer.getData('list_id')
    const list = document.getElementById(id)
    list.style.display = 'flex'
  }, [])
  return (
    <section className={styles.todoList}>
      <h3>Today&#39;s tasks</h3>
      <ul onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className={styles.todoInner}>
        {todoList.map((todo, index) => {
          return (
            <TodoItem
              index={index}
              move={nextIndex < index}
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
          )
        })}
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
