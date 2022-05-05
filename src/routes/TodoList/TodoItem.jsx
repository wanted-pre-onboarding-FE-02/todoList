import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useTodoDispatch } from 'routes/TodoContext'
import { cx } from 'styles'
import styles from './TodoItem.module.scss'
import { CheckIcon, TrashIcon } from 'assets/svgs'

export default function TodoItem({ id, text, done }) {
  const dispatch = useTodoDispatch()
  const handleToggle = () => dispatch({ type: 'TOGGLE', id })
  const handleDelClick = () => dispatch({ type: 'REMOVE', id })
  const handleSetUpdatedClick = () => dispatch({ type: 'SET_TODO', todo: { id, done, text } })

  return (
    <li className={styles.task}>
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={done} data-id={id} onChange={handleToggle} />
        <CheckIcon />
      </div>
      <Link to='/todo-update' onClick={handleSetUpdatedClick} className={cx(styles.text, { [styles.done]: done })}>
        {text}
      </Link>
      <button type='button' onClick={handleDelClick} className={styles.remove}>
        <TrashIcon />
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  done: PropTypes.bool,
}
