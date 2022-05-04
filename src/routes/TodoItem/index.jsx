import PropTypes from 'prop-types'
import styles from './TodoItem.module.scss'
import { CheckIcon, TrashIcon } from 'assets/svgs'
import { useTodoDispatch } from 'routes/TodoContext'
import { cx } from 'styles'

export default function TodoItem({ id, done, title }) {
  const dispatch = useTodoDispatch()
  const handleToggle = () => dispatch({ type: 'TOGGLE', id })
  const handleDelClick = () => dispatch({ type: 'REMOVE', id })

  return (
    <li className={styles.task}>
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={done} data-id={id} onChange={handleToggle} />
        <CheckIcon />
      </div>
      <p className={cx(styles.title, { [styles.done]: done })}>{title}</p>
      <button type='button' onClick={handleDelClick} className={styles.remove}>
        <TrashIcon />
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.number,
  done: PropTypes.bool,
  title: PropTypes.string,
}
