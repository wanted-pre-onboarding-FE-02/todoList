import React, { useCallback, useRef, useState } from 'react'
import styles from './TodoList.module.scss'
import { PlusIcon, CheckIcon } from '../../assets/svgs/index'
import { cx } from '../../styles/index'

const INITIAL_TODO = [
  {
    id: 1,
    content: 'do something',
    done: false,
  },
  {
    id: 2,
    content: 'play badminton',
    done: false,
  },
  {
    id: 3,
    content: 'eat hamburger',
    done: false,
  },
  {
    id: 4,
    content: 'learn typescript',
    done: false,
  },
  {
    id: 5,
    content: 'learn typescript',
    done: false,
  },
  {
    id: 6,
    content: 'learn typescript',
    done: false,
  },
  {
    id: 7,
    content: 'learn typescript',
    done: false,
  },
  {
    id: 8,
    content: 'learn typescript',
    done: false,
  },
]

function TodoList() {
  const [todos, setTodos] = useState([...INITIAL_TODO])
  const [text, setText] = useState('')

  const onChangeTodoCheck = useCallback((e) => {
    const CHECK_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.map((todo, index) => (todo.id === CHECK_ID ? { ...todo, done: !todo.done } : todo)))
  }, [])

  const onChangeText = (e) => {
    setText(e.currentTarget.value)
  }

  const onRemoveTodo = (e) => {
    const DELETE_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.filter((todo) => todo.id !== DELETE_ID))
  }

  return (
    <section className={styles.todoWrapper}>
      <div className={styles.todoHeader}>
        <h1>What&#39;s up, Joy</h1>
      </div>
      <div className='todoContent'>
        <div className={styles.todoList}>
          <input type='text' value={text} onChange={onChangeText} />
          <h3 className={styles.todoTitle}>Today&#39;s tasks</h3>

          <ul className={styles.todoInner}>
            {todos.map((todo, index) => {
              return (
                <li className={styles.todoElement} key={`todo-${todo.id}`}>
                  <div className={styles.checkboxWrapper}>
                    <input type='checkbox' checked={todo.done} data-id={todo.id} onChange={onChangeTodoCheck} />
                    <CheckIcon />
                    <p>{todo.content}</p>
                  </div>
                  <button type='button' className={styles.todoDeleteBtn} data-id={todo.id} onClick={onRemoveTodo}>
                    X
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <button type='button' className={styles.todoAddBtn} aria-label='Add Todo Button'>
          <PlusIcon />
        </button>
      </div>
    </section>
  )
}

export default TodoList
