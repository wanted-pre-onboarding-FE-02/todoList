import { useState, useRef } from 'react'
import styles from './TodoItem.module.scss'
import { CheckIcon } from '../../assets/svgs/index'
import PropTypes from 'prop-types'
import { cx } from '../../styles/index'

export default function TodoItem({ todo, handleToggle, handleRemove, handleEditMode, handleToggleLike }) {
  const [hoverItem, setHoverItem] = useState(false)
  const itemTextRef = useRef()
  const { id, text, done, invisible, isLike } = todo

  const handleTodoItemMouseEnter = () => {
    if (itemTextRef.current.scrollWidth > itemTextRef.current.offsetWidth) setHoverItem(true)
  }
  const handleTodoItemMouseLeave = () => {
    setHoverItem(false)
  }

  const handleCategorySave = (e) => {
    handleEditMode(e, todo)
  }

  const handleIsLikeSave = (e) => {
    handleToggle(e)
    handleToggleLike(e, todo)
  }

  return (
    <li className={cx(styles.todoElement, { [styles.isHidden]: invisible })} key={`todo-${id}`}>
      <div
        className={styles.checkboxWrapper}
        onMouseEnter={handleTodoItemMouseEnter}
        onMouseLeave={handleTodoItemMouseLeave}
      >
        <input type='checkbox' checked={done} data-id={id} onChange={handleIsLikeSave} />
        <CheckIcon />
        {isLike ? '📌' : ''}
        <p ref={itemTextRef}>{text}</p>
        {hoverItem && (
          <div className={styles.todoTooltip}>
            <p>{text}</p>
          </div>
        )}
      </div>
      <button type='button' className={styles.todoEditBtn} data-id={id} onClick={handleCategorySave}>
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
    invisible: PropTypes.bool,
    // date: PropTypes.string.isRequired,
    // category: PropTypes.string.isRequired,
    isLike: PropTypes.bool,
  }),
  handleToggleLike: PropTypes.func,
  handleToggle: PropTypes.func,
  handleRemove: PropTypes.func,
  handleEditMode: PropTypes.func,
}
