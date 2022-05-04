import React, { useCallback, useRef, useState } from 'react'
import styles from './TodoList.module.scss'
import { PlusIcon, CheckIcon } from '../../assets/svgs/index'
import { cx } from '../../styles/index'

const CATEGORY = ['healthy', 'study', 'etc']
const INITIAL_TODO = [
  {
    id: 1,
    content: 'do something',
    done: false,
    category: 'etc',
  },
  {
    id: 2,
    content: 'play badminton',
    done: false,
    category: 'exercise',
  },
  {
    id: 3,
    content: 'eat hamburger',
    done: false,
    category: 'healthy',
  },
  {
    id: 4,
    content: 'learn typescript',
    done: false,
    category: 'study',
  },
  {
    id: 5,
    content: 'learn typescript',
    done: false,
    category: 'study',
  },
  {
    id: 6,
    content: 'learn typescript',
    done: false,
    category: 'study',
  },
  {
    id: 7,
    content: 'learn typescript',
    done: false,
    category: 'study',
  },
  {
    id: 8,
    content: 'learn typescript',
    done: false,
    category: 'study',
  },
]

function TodoList() {
  return (
    <section className={styles.todoWrapper}>
      <div className={styles.todoHeader}>
        <h1>What&#39;s up, Joy</h1>
      </div>
      <div className='todoContent'>
        <div className={styles.todoList}>
          <input type='text' />
          <h3 className={styles.todoTitle}>Today&#39;s tasks</h3>
        </div>
        <button type='button' className={styles.todoAddBtn} aria-label='Add Todo Button'>
          <PlusIcon />
        </button>
      </div>
    </section>
  )
}

export default TodoList
