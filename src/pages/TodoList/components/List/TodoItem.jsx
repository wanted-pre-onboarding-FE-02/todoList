import PropTypes from 'prop-types'

import classes from './TodoItem.module.scss'

import { ReactComponent as Check } from '../svgs/check.svg'
import { useState } from 'react'

function TodoItem({ item, key }) {
  const [isChecked, setIsChecked] = useState(item.checked)

  const checkHandler = () => {
    setIsChecked((prev) => !prev)
  }

  const deleteHandler = () => {}

  return (
    // Non-interactive elements should not be assigned mouse or keyboard event listeners. <=린터 에러
    // https://issueantenna.com/repo/nala723/The-Dreamer/issues/98
    // <li className={classes.item} role='presentation' onClick={checkHandler}>
    <li className={classes.item} key={key}>
      <button
        type='button'
        className={`${classes.item__checkBtn} ${isChecked ? '' : classes['notChecked--btn']}`}
        onClick={checkHandler}
      >
        <Check />
      </button>
      <p className={`${classes.item__todo} ${isChecked ? '' : classes['notChecked--text']}`}>{item.todo}</p>
      {isChecked && (
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
  key: PropTypes.string.isRequired,
}

export default TodoItem
