import styles from './TodoList.module.scss'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'
import useDragDrop from 'hooks/useDragDrop'

export default function TodoList({ todos, setTodos, handleToggle, handleEditMode, handleRemove }) {
  const [handleDragEnd, handleDragEnter, handleDragOver, handleDragStart, handleDrop, todoList, nextIndex] =
    useDragDrop(todos)

  return (
    <section className={styles.todoList}>
      <h3>Today&#39;s tasks</h3>
      <ul onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className={styles.todoInner}>
        {todoList.map((todo, index) => {
          return (
            <TodoItem
              move={nextIndex < index}
              todo={todo}
              todoList={todoList}
              setTodos={setTodos}
              key={`todo-${todo.id}`}
              handleToggle={handleToggle}
              handleEditMode={handleEditMode}
              handleRemove={handleRemove}
              handleDragEnter={handleDragEnter}
              handleDragOver={handleDragOver}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
          )
        })}
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
  setTodos: PropTypes.func,
  handleToggle: PropTypes.func,
  handleEditMode: PropTypes.func,
  handleRemove: PropTypes.func,
}
