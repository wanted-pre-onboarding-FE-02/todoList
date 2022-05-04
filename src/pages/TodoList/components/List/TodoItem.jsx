import PropTypes from 'prop-types'

import classes from './TodoItem.module.scss'

import { ReactComponent as Check } from '../svgs/check.svg'

function TodoItem({ item }) {
  return (
    <li className={classes.item}>
      <button
        type='button'
        className={`${classes['item--checkbtn']} ${item.checked ? '' : classes['notChecked--btn']}`}
      >
        <Check />
      </button>
      <p className={`${classes['item--todo']} ${item.checked ? '' : classes['notChecked--text']}`}>{item.todo}</p>
    </li>
  )
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
}

export default TodoItem
