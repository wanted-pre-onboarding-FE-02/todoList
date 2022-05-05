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
      edit: false,
    },
    {
      id: 2,
      text: 'TIL 쓰기',
      done: false,
      edit: false,
    },
    {
      id: 3,
      text: '팀 과제 하기',
      done: false,
      edit: false,
    },
  ]

  const [todoList, setTodoList] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editValue, setEditValue] = useState('')

  const closeRef = useRef()

  const createTodoHanlder = (todoText) => {
    setTodoValue(todoText)
  }

  const createTodoListHandler = () => {
    setTodoList([...todoList, { id: Date.now(), text: todoValue, done: false, edit: false }])
    setShowModal(false)
    setTodoValue('')
  }

  const showModalHandler = () => {
    setShowModal(true)
  }

  const editHandler = (id) => {
    const index = todoList.findIndex((item) => item.id === id)
    const editMode = todoList.map((item) => {
      return id === item.id ? { ...item, edit: !todoList[index].edit } : item
    })

    setTodoList(editMode)
  }

  const todoValueChangeHandler = (id, e) => {
    const editText = todoList.map((item) => {
      return id === item.id ? { ...item, text: e.currentTarget.value } : item
    })

    setTodoList(editText)
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
            {todo.edit ? (
              <>
                <div className={styles.checkboxWrap}>
                  <input type='text' value={todo.text} onChange={(e) => todoValueChangeHandler(todo.id, e)} />
                </div>
                <EditIcon className={styles.edit} onClick={() => editHandler(todo.id)} />
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
