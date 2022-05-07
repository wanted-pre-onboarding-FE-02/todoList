import React from 'react'
import styles from './TodoHeader.module.scss'
import { SearchIcon } from '../../assets/svgs/index'

export default function TodoHeader() {
  return (
    <header className={styles.todoHeader}>
      <div className={styles.headerBtns}>
        <button type='button'>
          <SearchIcon />
        </button>
      </div>
      <h1>Hello, Stranger</h1>
    </header>
  )
}
