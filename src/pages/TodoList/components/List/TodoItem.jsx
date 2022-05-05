import PropTypes from 'prop-types'

import classes from './TodoItem.module.scss'

import { ReactComponent as Check } from '../svgs/check.svg'

function TodoItem({ item, toggle }) {
  const checkHandler = () => {
    toggle(item)
  }

  const deleteHandler = () => {}

  return (
    // Non-interactive elements should not be assigned mouse or keyboard event listeners. <=린터 에러
    // https://issueantenna.com/repo/nala723/The-Dreamer/issues/98
    // <li className={classes.item} role='presentation' onClick={checkHandler}>
    <li className={classes.item}>
      <button
        type='button'
        className={`${classes.item__checkBtn} ${item.checked ? '' : classes['notChecked--btn']}`}
        onClick={checkHandler}
      >
        <Check />
      </button>
      <p className={`${classes.item__todo} ${item.checked ? '' : classes['notChecked--text']}`}>{item.todo}</p>
      {item.checked && (
        <button type='button' className={classes.item__deleteBtn} onClick={deleteHandler}>
          delete
        </button>
      )}
    </li>
  )
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
  toggle: PropTypes.func.isRequired,
}

export default TodoItem
