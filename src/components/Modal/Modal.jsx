
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
    createTask(text)
  }
  return (
    <div className={styles.modalPage}>
      <div className={styles.content}>
        <h2>new todo</h2>
        <input type='text' onChange={changeTextHandler}/>
        <button type='submit' onClick={createTaskClickHandler} >create</button>
      </div>
    </div>
  )
}

export default Modal
