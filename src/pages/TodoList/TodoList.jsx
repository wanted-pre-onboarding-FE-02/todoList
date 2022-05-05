import React, { useCallback, useRef, useState } from 'react'
import styles from './TodoList.module.scss'
import { PlusIcon, CheckIcon, MenuIcon, SearchIcon, EditIcon } from '../../assets/svgs/index'
import { cx } from '../../styles/index'
import { CATEGORY, INITIAL_TODO } from './Variables'

function TodoList() {
  const nextId = useRef(9)
  const [todos, setTodos] = useState([...INITIAL_TODO])
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selected, setSelected] = useState(0)

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
  const onAddAndToggleTodo = () => {
    if (text.trim() === '') {
      setShow((prev) => !prev)
      return
    }

    const newTodo = {
      content: text.trim(),
      id: nextId.current,
      done: false,
    }

    setTodos(todos.concat(newTodo))
    nextId.current += 1
    setText('')
    setShow((prev) => !prev)
  }

  const onClickEdit = (e) => {
    setIsEditing((prev) => !prev)
    const EDIT_ID = parseInt(e.target.dataset.id, 10)
    setSelected(EDIT_ID)
    setShow((prev) => !prev)
    const newText = todos.filter((todo) => todo.id === EDIT_ID)[0].content
    setText(newText)
  }

  const onEditTodo = () => {
    setTodos((todos) => todos.map((todo, index) => (todo.id === selected ? { ...todo, content: text } : todo)))
    setIsEditing(false)
    setShow((prev) => !prev)
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
                  <button type='button' className={styles.todoEditBtn} data-id={todo.id} onClick={onClickEdit}>
                    ✏️
                  </button>
                  <button type='button' className={styles.todoDeleteBtn} data-id={todo.id} onClick={onRemoveTodo}>
                    x
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        {isEditing ? (
          <button type='button' className={styles.todoAddBtn} aria-label='Add Todo Button' onClick={onEditTodo}>
            ✏️
          </button>
        ) : (
          <button type='button' className={styles.todoAddBtn} aria-label='Add Todo Button' onClick={onAddAndToggleTodo}>
            <PlusIcon />
          </button>
        )}
      </main>
      {show && (
        <div className={styles.addModal}>
          <h3>Today&#39;s tasks is...</h3>
          <input type='text' value={text} onChange={onChangeText} className={styles.addTodoInput} />
        </div>
      )}
    </section>
  )
}

export default TodoList
