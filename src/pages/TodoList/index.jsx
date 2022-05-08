import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './TodoList.module.scss'

import FilterModal from 'components/FilterModal'
import { ReactComponent as Filter } from '../../assets/svgs/filter.svg'
import TodoItem from './TodoItem'

import { sortByDateAsd, sortByDateDsd, sortByDic, sortByDone } from 'utils/sort'

const FILTER_LIST = ['최신순', '과거순', '가나다순', '완료순']

export default function TodoList({
  isFilterActive,
  todos,
  copyTodos,
  handleToggle,
  handleEditMode,
  handleRemove,
  todoIsLike,
  handleToggleLike,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortedTodos, setSortedTodos] = useState(todos) // 정렬된 리스트

  useEffect(() => {
    // todo가 바뀌면 재랜더링
    setSortedTodos(todos)
  }, [setSortedTodos, todos])

  // 모달 토글 핸들러
  const modalToggleHandler = () => {
    setIsModalOpen((prev) => !prev)
  }

  // 필터를 누르면 필터의 값에 따라 정렬됨 => sortedTodos
  const selectFilterHandler = (e) => {
    const filter = e.target.innerText
    setIsModalOpen((prev) => !prev)

    // 날짜 오름차순
    if (filter === FILTER_LIST[0]) {
      setSortedTodos((prevTodos) => {
        return prevTodos.sort((a, b) => sortByDateAsd(a, b)).slice() // 깊은 복사로 set
      })
    }

    // 날짜 내림차순
    if (filter === FILTER_LIST[1]) {
      setSortedTodos((prevTodos) => {
        return prevTodos.sort((a, b) => sortByDateDsd(a, b)).slice()
      })
    }

    // 가나다순
    if (filter === FILTER_LIST[2]) {
      setSortedTodos((prevTodos) => {
        return prevTodos.sort((a, b) => sortByDic(a, b)).slice()
      })
    }

    // 완료순
    if (filter === FILTER_LIST[3]) {
      setSortedTodos((prevTodos) => {
        return prevTodos.sort((a, b) => sortByDone(a, b)).slice()
      })
    }
  }
  return (
    <section className={styles.todoList}>
      {isModalOpen && <FilterModal onSelectFilter={selectFilterHandler} filterList={FILTER_LIST} />}
      <div className={styles.header}>
        <h3>tasks</h3>
        <button type='button' onClick={modalToggleHandler}>
          <Filter className={styles.header__icon} />
        </button>
      </div>

      <ul className={styles.todoInner}>
        {isFilterActive
          ? copyTodos.map(
              (
                todo //
              ) => (
                <TodoItem
                  handleToggleLike={handleToggleLike}
                  todoIsLike={todoIsLike}
                  todo={todo}
                  key={`todo-${todo.id}`}
                  handleToggle={handleToggle}
                  handleEditMode={handleEditMode}
                  handleRemove={handleRemove}
                />
              )
            )
          : sortedTodos.map(
              (
                todo //
              ) => (
                <TodoItem
                  handleToggleLike={handleToggleLike}
                  todoIsLike={todoIsLike}
                  todo={todo}
                  key={`todo-${todo.id}`}
                  handleToggle={handleToggle}
                  handleEditMode={handleEditMode}
                  handleRemove={handleRemove}
                />
              )
            )}
      </ul>
    </section>
  )
}

TodoList.propTypes = {
  isFilterActive: PropTypes.bool,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      date: PropTypes.string,
      category: PropTypes.string,
      done: PropTypes.bool,
      isLike: PropTypes.bool,
    })
  ),
  copyTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      date: PropTypes.string,
      category: PropTypes.string,
      done: PropTypes.bool,
      isLike: PropTypes.bool,
    })
  ),
  handleToggleLike: PropTypes.func,
  todoIsLike: PropTypes.bool,
  handleToggle: PropTypes.func,
  handleEditMode: PropTypes.func,
  handleRemove: PropTypes.func,
}
