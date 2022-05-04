import React, { useState } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon, EditIcon, TrashIcon } from '../../assets/svgs'
import Modal from '../../components/Common/Modal/Modal'

const DUMMY_LIST = [
  {
    id: 1,
    content: 'first',
    done: false,
  },
  {
    id: 2,
    content: 'second',
    done: false,
  },
  {
    id: 3,
    content: 'third',
    done: true,
  },
]
const id = 0

function TodoList() {
  const [todoList, setTodoList] = useState([])
  const [doneCheckbox, setDoneCheckbox] = useState(true)
  const [modal, setModal] = useState(false)

  const shwoModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const createTodoHandler = (todo) => {
    const createTodo = {
      id: Date.now(),
      content: todo,
      edit: false,
      done: false,
    }
    setTodoList((prev) => {
      return [...prev, createTodo]
    })

    setModal(false)
  }

  const todoDoneHandler = (todo) => {
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

      {todoList.map((todo) => {
        return (
          <div className={styles.tasks} key={todo.id}>
            <div className={styles.wrap}>
              {todo.done ? (
                <CheckIcon className={styles.icon} onClick={() => todoDoneHandler(todo)} />
              ) : (
                <button type='submit' aria-hidden className={styles.done} onClick={() => todoDoneHandler(todo)} />
              )}

              {todo.edit ? (
                <input type='text' className={styles.editInput} value={todo.content} />
              ) : (
                <p className={styles.taskContent}>{todo.content}</p>
              )}
            </div>
            <div className={styles.wrap}>
              <EditIcon className={styles.editIcon} onClick={() => editToggleHandler(todo)} />
              <TrashIcon className={styles.trashIcon} onClick={() => deleteTodoHandler(todo)} />
            </div>
          </div>
        )
      })}

      <button type='submit' className={styles.todoAddButton} onClick={shwoModal}>
        +
      </button>
      <Modal show={modal} close={closeModal} createTodo={createTodoHandler} />
    </div>
  )
}

export default TodoList
