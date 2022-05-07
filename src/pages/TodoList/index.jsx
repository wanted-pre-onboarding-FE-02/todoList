import { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './TodoList.module.scss'

import FilterModal from 'components/FilterModal'
import { ReactComponent as Filter } from '../../assets/svgs/filter.svg'
import TodoItem from './TodoItem'

import { sortByDateAsd, sortByDateDsd, sortByDic, sortByDone } from 'utils/sort'

const FILTER_LIST = ['최신순', '과거순', '가나다순']

export default function TodoList({ todos, handleToggle, handleEditMode, handleRemove }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(FILTER_LIST[0])
  const dateParsedTodos = todos.map((todo) => ({ ...todo, date: Date.parse(todo.date) }))
  let listMarkup

  const modalToggleHandler = () => {
    setIsModalOpen((prev) => !prev)
  }

  const selectFilterHandler = (e) => {
    const filter = e.target.innerText

    switch (filter) {
      case filter === FILTER_LIST[0]:
        setSelectedFilter(FILTER_LIST[0])
        break
      case filter === FILTER_LIST[1]:
        setSelectedFilter(FILTER_LIST[1])
        break
      case filter === FILTER_LIST[2]:
        setSelectedFilter(FILTER_LIST[2])
        break
      default:
        break
    }
  }
  console.log(todos.sort((a, b) => sortByDateAsd(a, b)))

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
        {todos
          .sort((a, b) => sortByDone(a, b))
          .map((todo) => (
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
