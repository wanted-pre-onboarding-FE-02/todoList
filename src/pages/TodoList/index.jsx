import styles from './TodoList.module.scss'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

export default function TodoList({ todos, handleToggle, handleEditMode, handleRemove }) {
  return (
    <section className={styles.todoList}>
      <h3>Today&#39;s tasks</h3>

      <ul className={styles.todoInner}>
        {todos.map((todo) => (
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
