import styles from './TodoList.module.scss'
import { CheckIcon } from '../../assets/svgs/index'
import PropTypes from 'prop-types'

export default function TodoItem({ todo, handleToggle, handleRemove, handleEditMode }) {
  const { id, text, done } = todo

  return (
    <li className={styles.todoElement} key={`todo-${id}`}>
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
  handleToggle: PropTypes.func,
  handleRemove: PropTypes.func,
  handleEditMode: PropTypes.func,
}
