import styles from './TodoList.module.scss'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

export default function TodoList({ isFilterActive,todos, copyTodos, handleToggle, handleEditMode, handleRemove }) {
  return (
    <section className={styles.todoList}>
      <h3>Today&#39;s tasks</h3>

      <ul className={styles.todoInner}>
        {isFilterActive ? 
          copyTodos.map((todo) => (
            <TodoItem
              todo={todo}
              key={`todo-${todo.id}`}
              handleToggle={handleToggle}
              handleEditMode={handleEditMode}
              handleRemove={handleRemove}
            />
          ))
          :
          todos.map((todo) => (
            <TodoItem
              todo={todo}
              key={`todo-${todo.id}`}
              handleToggle={handleToggle}
              handleEditMode={handleEditMode}
              handleRemove={handleRemove}
            />
          ))
        }
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
  handleToggle: PropTypes.func,
  handleEditMode: PropTypes.func,
  handleRemove: PropTypes.func,
}
