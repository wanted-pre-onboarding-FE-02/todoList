import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'
import { CloseIcon } from '../../../assets/svgs'

function Modal(props) {
  const { show, close, createTodo } = props
  const [todo, setTodo] = useState('')

  const element = document.getElementById('modal')

  const enteredTodoChangeHandler = (e) => {
    setTodo(e.currentTarget.value)
  }

  return ReactDOM.createPortal(
    <div>
      {show ? (
        <div className={styles.modal}>
          <div className={styles.createTodo}>
            <CloseIcon className={styles.closeIcon} onClick={close} />
            <input
              type='text'
              placeholder='내용을 입력해주세요.'
              onChange={enteredTodoChangeHandler}
              className={styles.createTodoInput}
            />
            <button type='submit' onClick={() => createTodo(todo)} className={styles.createButton}>
              create
            </button>
          </div>
        </div>
      ) : null}
    </div>,
    element
  )
}

export default Modal
