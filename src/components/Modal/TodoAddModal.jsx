import { useState } from 'react'
import styles from './TodoAddModal.module.scss'

function TodoAddModal(props) {
  const closeModalHandler = () => {}
  // console.log(props.todoValue)
  // const { todoValue } = props

  return (
    <div className={styles.todoModal}>
      <input type='text' className={styles.inputAdd} />
      <button type='button' onClick={closeModalHandler}>
        닫기
      </button>
    </div>
  )
}

export default TodoAddModal
