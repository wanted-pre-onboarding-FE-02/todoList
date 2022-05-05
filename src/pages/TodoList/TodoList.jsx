import { useEffect, useRef, useState } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon, EditIcon, TrashIcon } from '../../assets/svgs'
import Modal from '../../components/Common/Modal/Modal'

function TodoList() {
  const [todoList, setTodoList] = useState([])
  const [modal, setModal] = useState(false)
  const [todoEditText, setTodoEditText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [todoList])

  const shwoModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const createTodoHandler = (todo) => {
    if (todo.trim().length === 0) {
      return
    }
    const createTodo = {
      id: Date.now(),
      content: todo,
      edit: false,
      done: false,
    }
    setTodoList((prev) => {
      return [createTodo, ...prev]
    })

    setModal(false)
  }

  const todoDoneToggleHandler = (todo) => {
    const findTodoItem = todoList.findIndex((todoItem) => todoItem.id === todo.id)
    const clickTodo = todoList.map((todoItem) => {
      return todoItem.id === todo.id ? { ...todoItem, done: !todoList[findTodoItem].done } : todoItem
    })
    setTodoList(clickTodo)
  }

  const editToggleHandler = (todo) => {
    const findTodoItem = todoList.findIndex((todoItem) => todoItem.id === todo.id)
    const clickTodo = todoList.map((todoItem) => {
      return todoItem.id === todo.id ? { ...todoItem, edit: !todoList[findTodoItem].edit } : todoItem
    })
    setTodoEditText(todoList[findTodoItem].content)

    setTodoList(clickTodo)
  }

  const editTodoTextHandler = (e) => {
    setTodoEditText(e.currentTarget.value)
  }

  const editFocusOutHandler = (todo) => {
    const findTodoItem = todoList.findIndex((todoItem) => todoItem.id === todo.id)
    const clickTodo = todoList.map((todoItem) => {
      return todoItem.id === todo.id
        ? { ...todoItem, content: todoEditText, edit: !todoList[findTodoItem].edit }
        : todoItem
    })
    setTodoList(clickTodo)
  }

  const deleteTodoHandler = (todo) => {
    const remoteAfterTodo = todoList.filter((todoItem) => todo.id !== todoItem.id)
    setTodoList(remoteAfterTodo)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>What&apos;s up,Joy!</h1>
      <p className={styles.todayTask}>TODAY&apos;S TASKS</p>
      <div className={styles.tasks}>
        {todoList.map((todo) => {
          return (
            <div className={styles.task} key={todo.id}>
              <div className={styles.wrap}>
                {todo.done ? (
                  <CheckIcon className={styles.icon} onClick={() => todoDoneToggleHandler(todo)} />
                ) : (
                  <button
                    type='submit'
                    aria-hidden
                    className={styles.done}
                    onClick={() => todoDoneToggleHandler(todo)}
                  />
                )}

                {todo.edit ? (
                  <input
                    type='text'
                    value={todoEditText}
                    ref={inputRef}
                    className={styles.editInput}
                    onChange={editTodoTextHandler}
                    onBlur={() => editFocusOutHandler(todo)}
                  />
                ) : (
                  <div className={styles.doneContainer}>
                    <p className={styles.taskContent}>{todo.content}</p>
                    {todo.done ? <div className={styles.todoDone} /> : null}
                  </div>
                )}
              </div>

              <div className={styles.wrap}>
                <EditIcon className={styles.editIcon} onClick={() => editToggleHandler(todo)} />
                <TrashIcon className={styles.trashIcon} onClick={() => deleteTodoHandler(todo)} />
              </div>
            </div>
          )
        })}
      </div>

      <button type='submit' className={styles.todoAddButton} onClick={shwoModal}>
        +
      </button>
      <Modal show={modal} close={closeModal} createTodo={createTodoHandler} />
    </div>
  )
}

export default TodoList
