import styles from './TodoList.module.scss'
import { CheckIcon, EditIcon, DeleteIcon } from '../../assets/svgs'
import { useEffect, useRef, useState } from 'react'
import TodoAddModal from '../../components/common/Modal/TodoAddModal'

function TodoList() {
  const TODO_ITEM = [
    {
      id: 1,
      text: 'Jira 셋팅',
      done: false,
    },
    {
      id: 2,
      text: 'TIL 쓰기',
      done: false,
    },
    {
      id: 3,
      text: '팀 과제 하기',
      done: false,
    },
  ]

  const [todoList, setTodoList] = useState([])
  const [todoEdit, setTodoEdit] = useState(false)
  const [todoValue, setTodoValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const closeRef = useRef()

  const createTodoHanlder = (todoText) => {
    setTodoValue(todoText)
  }

  const createTodoListHandler = () => {
    setTodoList([...todoList, { id: Date.now(), text: todoValue, done: false }])
    setShowModal(false)
  }

  const showModalHandler = () => {
    setShowModal(true)
  }

  const todoValueChangeHandler = (e) => {
    setTodoValue(e.currentTarget.value)
  }

  const editHandler = (todoItemID) => {
    setTodoEdit(true)
  }

  const editCompletedHandler = () => {
    setTodoEdit(false)
  }

  const deleteHandler = (id) => {
    const newTodo = todoList.filter((item) => item.id !== id)
    setTodoList(newTodo)
  }

  function closeHandler(e) {
    if (closeRef.current && !closeRef.current.contains(e.target)) {
      setShowModal(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', closeHandler)
    return () => {
      document.removeEventListener('mousedown', closeHandler)
    }
  }, [closeRef])

  return (
    <section className={`${styles.todoList} ${showModal ? styles.on : ''}`}>
      <h1>What&apos; s up, Joy!</h1>
      <p className={styles.categories}>CATEGORIES</p>

      <p>TODAY&apos; S TASKS</p>
      <ul>
        {todoList.map((todo) => (
          <li key={`todo-${todo.id}`} className={styles.task}>
            {todoEdit ? (
              <>
                <div className={styles.checkboxWrap}>
                  <input type='text' value={todoValue} onChange={todoValueChangeHandler} />
                </div>
                <EditIcon className={styles.edit} onClick={editCompletedHandler} />
              </>
            ) : (
              <>
                <div className={styles.checkboxWrap}>
                  <input type='checkbox' />
                  <CheckIcon />
                  <span>{todo.text}</span>
                </div>
                <EditIcon className={styles.edit} onClick={() => editHandler(todo.id)} />
                <DeleteIcon className={styles.delete} onClick={() => deleteHandler(todo.id)} />
              </>
            )}
          </li>
        ))}
      </ul>

      <button type='button' className={styles.addButton} aria-label='add button' onClick={showModalHandler} />
      {showModal ? (
        <div className={styles.modalWrap} ref={closeRef}>
          <TodoAddModal createTodoHanlder={createTodoHanlder} createTodoListHandler={createTodoListHandler} />
        </div>
      ) : null}
    </section>
  )
}

export default TodoList
