import { useState } from 'react';

import styles from './TodoItem.module.scss'
import { CheckIcon } from '../../assets/svgs/index'
import PropTypes from 'prop-types'

export default function TodoItem({ todo, handleToggle, handleRemove, handleEditMode }) {
  const [hoverItem, setHoverItem] = useState(false)
  const { id, text, done } = todo


  const getTextLength = str => {
    let byte = 0
    const code = str.charCodeAt(0)

    for (let i=0; i<str.length; i+=1) {
      if (code > 127) byte+=2
      else if (code > 64 && code < 91) byte +=2
      else byte+=1
    }      
    return byte
  }

  const handleTodoItemMouseEnter = () => {
    console.log(getTextLength(text))
    setHoverItem(true)
  }

  const handleTodoItemMouseLeave = () => { setHoverItem(false) }

  return (
    <li className={styles.todoElement} key={`todo-${id}`}>
      <div className={styles.checkboxWrapper}
          onMouseEnter={handleTodoItemMouseEnter}
          onMouseLeave={handleTodoItemMouseLeave}      
      >
        <input type='checkbox' checked={done} data-id={id} onChange={handleToggle} />
        <CheckIcon />
        <p>{text}</p>
        {hoverItem &&
          <div className={styles.todoTooltip}>
            <p>{text}</p>
          </div>
        }
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
