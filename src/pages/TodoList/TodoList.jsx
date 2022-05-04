import styles from './TodoList.module.scss'
import { CheckIcon, EditIcon } from '../../assets/svgs'
import { useEffect, useRef, useState } from 'react'
import TodoAddModal from '../../components/Modal/TodoAddModal'

function TodoList() {
  const TODO_ITEM = [
    {
      id: 1,
      title: 'Jira 셋팅',
      done: false,
    },
    {
      id: 2,
      title: 'TIL 쓰기',
      done: false,
    },
    {
      id: 3,
      title: '팀 과제 하기',
      done: false,
    },
  ]

  const [todoList, setTodoList] = useState(TODO_ITEM)
  const [todoEditId, setTodoEditId] = useState('')
  const [todoValue, setTodoValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const closeRef = useRef()

  const addTodoHandler = () => {
    setShowModal(true)
  }

  const todoValueChangeHandler = (e) => {
    setTodoValue(e.currentTarget.value)
  }

  const editHandler = (todoItemID) => {
    setTodoEditId(todoItemID)
  }

  const completeEditHandler = () => {}

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

  console.log(showModal)
  return (
    <section className={`${styles.todoList} ${showModal ? styles.on : ''}`} ref={closeRef}>
      <h1>What&apos; s up, Joy!</h1>
      <p className={styles.categories}>CATEGORIES</p>

      <p>TODAY&apos; S TASKS</p>
      <ul>
        {todoList.map((todo) => (
          <li key={`todo-${todo.id}`} className={styles.task}>
            <div className={styles.checkboxWrap}>
              {todoEditId === todo.id ? (
                <>
                  <input type='text' value={todoValue} onChange={todoValueChangeHandler} />
                  <button type='button' onClick={completeEditHandler}>
                    확인
                  </button>
                </>
              ) : (
                <>
                  <input type='checkbox' />
                  <CheckIcon />
                  <span>{todo.title}</span>
                  <EditIcon className={styles.edit} onClick={() => editHandler(todo.id)} />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button type='button' className={styles.addButton} aria-label='add button' onClick={addTodoHandler} />
      {showModal ? <TodoAddModal /> : null}
    </section>
  )
}

export default TodoList
