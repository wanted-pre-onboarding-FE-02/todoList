import React, { useCallback, useRef, useState } from 'react'
import styles from './TodoList.module.scss'
import { PlusIcon, CheckIcon, MenuIcon, SearchIcon } from '../../assets/svgs/index'
import { cx } from '../../styles/index'

const CATEGORY = ['work', 'exercise', 'study']
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
  const nextId = useRef(9)
  const [todos, setTodos] = useState([...INITIAL_TODO])
  const [text, setText] = useState('')

  const onChangeTodoCheck = useCallback((e) => {
    const CHECK_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.map((todo, index) => (todo.id === CHECK_ID ? { ...todo, done: !todo.done } : todo)))
  }, [])

  const onRemoveTodo = (e) => {
    const DELETE_ID = parseInt(e.target.dataset.id, 10)
    setTodos((todos) => todos.filter((todo) => todo.id !== DELETE_ID))
  }

  const onChangeText = (e) => {
    setText(e.currentTarget.value)
  }
  const onAddTodo = () => {
    if (text.trim() === '') return

    const newTodo = {
      content: text.trim(),
      id: nextId.current,
    }

    setTodos(todos.concat(newTodo))
    nextId.current += 1
    setText('')
  }

  return (
    <section className={styles.todoWrapper}>
      <header className={styles.todoHeader}>
        <div className={styles.headerBtns}>
          <button type='button'>
            <MenuIcon />
          </button>
          <div>
            <button type='button'>
              <SearchIcon />
            </button>
          </div>
        </div>
        <h1>Hello, Stranger</h1>
      </header>
      <main className={styles.todoContent}>
        <div className={styles.categoryList}>
          <h3>category</h3>
          <ul className={styles.categoryInner}>
            {CATEGORY.map((cate, index) => {
              return <li key={`category-${cate}`}>{cate}</li>
            })}
          </ul>
        </div>

        <div className={styles.todoList}>
          <h3>Today&#39;s tasks</h3>

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
                    x
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <button type='button' className={styles.todoAddBtn} aria-label='Add Todo Button' onClick={onAddTodo}>
          <PlusIcon />
        </button>
      </main>
    </section>
  )
}

export default TodoList
