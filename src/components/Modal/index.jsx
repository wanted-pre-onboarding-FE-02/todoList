import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'
import { PinIcon, PinFixedIcon } from '../../assets/svgs'

function Modal(props) {
  const focusRef = useRef()
  useEffect(() => {
    focusRef.current.focus()
  }, [])
  const { text, isLike, handleChangeText, handleModal, handleLike } = props

  return ReactDOM.createPortal(
    <div className={styles.addModal}>
      <button type='button' className={styles.closeBtn} onClick={handleModal}>
        X
      </button>
      <button type='button' className={styles.pin} onClick={handleLike}>
        {isLike ? <PinFixedIcon /> : <PinIcon />}
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
