import { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './TodoList.module.scss'

import FilterModal from 'components/FilterModal'
import { ReactComponent as Filter } from '../../assets/svgs/filter.svg'
import TodoItem from './TodoItem'

import { sortByDateAsd, sortByDateDsd, sortByDic, sortByDone } from 'utils/sort'

const FILTER_LIST = ['최신순', '과거순', '가나다순', '완료순']

export default function TodoList({ todos, handleToggle, handleEditMode, handleRemove }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortedTodos, setSortedTodos] = useState(todos)

  const modalToggleHandler = () => {
    // 모달 토글 핸들러
    setIsModalOpen((prev) => !prev)
  }

  const selectFilterHandler = (e) => {
    // 필터를 누르면 필터의 값에 따라 정렬됨 => sortedTodos
    const filter = e.target.innerText

    if (filter === FILTER_LIST[0]) {
      // 날짜 오름차순
      setSortedTodos((prevTodos) => {
        return prevTodos.sort((a, b) => sortByDateAsd(a, b)).slice()
      })
    }

    if (filter === FILTER_LIST[1]) {
      // 날짜 내림차순
      setSortedTodos((prevTodos) => {
        return prevTodos.sort((a, b) => sortByDateDsd(a, b)).slice()
      })
    }

    if (filter === FILTER_LIST[2]) {
      // 가나다순
      setSortedTodos((prevTodos) => {
        return prevTodos.sort((a, b) => sortByDic(a, b)).slice()
      })
    }

    if (filter === FILTER_LIST[3]) {
      // 완료순
      setSortedTodos((prevTodos) => {
        return prevTodos.sort((a, b) => sortByDone(a, b)).slice()
      })
    }
  }

  return (
    <section className={styles.todoList}>
      {isModalOpen && <FilterModal onSelectFilter={selectFilterHandler} filterList={FILTER_LIST} />}
      <div className={styles.header}>
        <h3>Today&#39;s tasks</h3>
        <button type='button' onClick={modalToggleHandler}>
          <Filter className={styles.header__icon} />
        </button>
      </div>

      <ul className={styles.todoInner}>
        {sortedTodos.map((todo) => (
          <TodoItem
            todo={todo}
            key={`todo-${todo.id}`}
            handleToggle={handleToggle}
            handleEditMode={handleEditMode}
            handleRemove={handleRemove}
          />
        ))}
      </ul>
    </section>
  )
}

TodoList.propTypes = {
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
  handleToggle: PropTypes.func,
  handleEditMode: PropTypes.func,
  handleRemove: PropTypes.func,
}
