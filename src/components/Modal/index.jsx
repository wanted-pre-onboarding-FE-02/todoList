<<<<<<< HEAD
import SelectBar from 'pages/TodoCategory/SelectBar'
import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'
import { PinIcon, PinFixedIcon } from '../../assets/svgs'

function Modal(props) {
  const focusRef = useRef()

  useEffect(() => {
    focusRef.current.focus()
  }, [])
  const { text, handleChangeText, handleModal, handleSaveCategory, todoCategory, handleLike, todoIsLike } = props

  return ReactDOM.createPortal(
    <div className={styles.addModal}>
      <SelectBar handleSaveCategory={handleSaveCategory} todoCategory={todoCategory} />
      <button type='button' className={styles.closeBtn} onClick={handleModal}>
        X
      </button>
      <button type='button' className={styles.pin} onClick={handleLike}>
        {todoIsLike ? <PinFixedIcon /> : <PinIcon />}
      </button>
      <div className={styles.inputBlock}>
        <h3>Today&#39;s task is...</h3>
        <input type='text' value={text} ref={focusRef} onChange={handleChangeText} className={styles.addTodoInput} />
      </div>
    </div>,
    document.getElementById('modal')
=======
import PropTypes from 'prop-types'

import styles from './index.module.scss'
import Portal from 'components/Portal'

export default function Modal({ children }) {
  return (
    <Portal>
      <div className={styles.overlay}>{children}</div>
    </Portal>
>>>>>>> kimjunyeop2
  )
}

Modal.propTypes = {
  children: PropTypes.element,
}
