import styles from './TodoItem.module.scss'
import { CheckIcon } from '../../assets/svgs/index'
import PropTypes from 'prop-types'
import { cx } from 'styles'
import { useEffect } from 'react'

export default function TodoItem({
  todo,
  handleDragEnter,
  handleDragOver,
  handleDragStart,
  handleDragEnd,
  handleToggle,
  handleRemove,
  handleEditMode,
  moveDown,
  index,
}) {
  const { id, text, done } = todo

  return (
    <li
      onDragEnter={handleDragEnter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={(e) => handleDragEnd(e, moveDown)}
      draggable
      className={cx(styles.todoElement, moveDown ? styles.moveDown : styles.moveUp)}
      key={`todo-${id}`}
      id={id}
    >
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={done} data-id={id} onChange={handleToggle} />
        <CheckIcon />
        <p>{text}</p>
      </div>
      <button type='button' className={styles.todoEditBtn} data-id={id} onClick={handleEditMode}>
        ✏️
      </button>
      <button type='button' className={styles.todoDeleteBtn} data-id={id} onClick={handleRemove}>
        x
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    done: PropTypes.bool,
    // date: PropTypes.string.isRequired,
    // category: PropTypes.string.isRequired,
    // isLike: PropTypes.bool.isRequired,
  }),
  index: PropTypes.number,
  moveDown: PropTypes.bool,
  handleDragEnter: PropTypes.func,
  handleDragOver: PropTypes.func,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleToggle: PropTypes.func,
  handleRemove: PropTypes.func,
  handleEditMode: PropTypes.func,
}
