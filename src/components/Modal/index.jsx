import SelectBar from 'pages/TodoCategory/SelectBar'
import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

function Modal(props) {
  const focusRef = useRef()
  useEffect(() => {
    focusRef.current.focus()
  }, [])
  const { text, handleChangeText, handleModal, handleSaveCategory, todoCategory } = props

  return ReactDOM.createPortal(
    <div className={styles.addModal}>
      <SelectBar handleSaveCategory={handleSaveCategory} todoCategory={todoCategory} />
      <button type='button' className={styles.closeBtn} onClick={handleModal}>
        X
      </button>
      <div className={styles.inputBlock}>
        <h3>Today&#39;s task is...</h3>
        <input type='text' value={text} ref={focusRef} onChange={handleChangeText} className={styles.addTodoInput} />
      </div>
    </div>,
    document.getElementById('modal')
  )
}

export default Modal
