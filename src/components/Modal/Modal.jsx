
import { useState } from 'react'
import styles from './Modal.module.scss'
import { Cancel } from '../../assets/svgs'

function Modal(props) {
  // eslint-disable-next-line react/prop-types
  const { createTask, closeModal } = props
  const [text, setText] = useState('')
  const changeTextHandler = (e) => {
    setText(e.currentTarget.value)
  }
  const createTaskClickHandler = () => {
    if (text.length === 0)
      closeModal(false)
    else
      createTask(text)
  }
  const cancelCreateTaskHandler = () => {
    closeModal(false)
  }
  return (
    <div className={styles.modalPage}>
      <div className={styles.content}>
        <Cancel onClick={cancelCreateTaskHandler}/>
        <h2>new todo</h2>
        <input type='text' onChange={changeTextHandler}/>
        <button type='submit' onClick={createTaskClickHandler}><p>CREATE</p></button>
      </div>
    </div>
  )
}

export default Modal
