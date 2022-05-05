import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

function Modal(props) {
  const { text, handleChangeText } = props

  return ReactDOM.createPortal(
    <div className={styles.addModal}>
      <h3>Today&#39;s task is...</h3>
      <input type='text' value={text} onChange={handleChangeText} className={styles.addTodoInput} />
    </div>,
    document.getElementById('modal')
  )
}

export default Modal
