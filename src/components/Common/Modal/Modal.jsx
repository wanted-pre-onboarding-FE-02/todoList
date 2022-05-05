import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'
import { CloseIcon } from '../../../assets/svgs'

function Modal(props) {
  const { show, close, createTodo } = props

  const [todo, setTodo] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [show])

  const element = document.getElementById('modal')

  const enteredTodoChangeHandler = (e) => {
    setTodo(e.currentTarget.value)
  }

  const createClickHandler = () => {
    createTodo(todo)
    setTodo('')
  }

  const createEnterKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      createTodo(todo)
      setTodo('')
    }
  }

  return ReactDOM.createPortal(
    <div>
      {show && (
        <div className={styles.modal}>
          <div className={styles.createTodo}>
            <CloseIcon className={styles.closeIcon} onClick={close} />
            <input
              type='text'
              ref={inputRef}
              placeholder='내용을 입력해주세요.'
              onChange={enteredTodoChangeHandler}
              onKeyDown={createEnterKeyDownHandler}
              className={styles.createTodoInput}
            />
            <button type='submit' onClick={createClickHandler} className={styles.createButton}>
              create
            </button>
          </div>
        </div>
      )}
    </div>,
    element
  )
}

export default Modal
