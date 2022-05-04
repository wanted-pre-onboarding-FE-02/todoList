import { useState } from 'react'
import styles from './TodoAddModal.module.scss'
import { CheckIcon } from '../../../assets/svgs'

function TodoAddModal(props) {
  /* eslint-disable react/prop-types */
  const { createTodoHanlder, createTodoListHandler } = props

  const TodovalueHandler = (e) => {
    createTodoHanlder(e.currentTarget.value)
  }

  return (
    <div className={`${styles.todoModal}`}>
      <input type='text' className={styles.inputAdd} onChange={TodovalueHandler} />
      <button type='button' onClick={createTodoListHandler}>
        <CheckIcon />
      </button>
    </div>
  )
}

export default TodoAddModal
