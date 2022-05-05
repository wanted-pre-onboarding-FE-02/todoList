import PropTypes from 'prop-types'
import styles from './TodoInput.module.scss'

export default function TodoInput({ isUpdate = false, text, handleChange, handleClick }) {
  return (
    <div className={styles.todoInput}>
      <div className={styles.textWrapper}>
        <input type='text' placeholder='Enter New task' value={text} onChange={handleChange} />
      </div>
      <button type='button' onClick={handleClick}>
        {isUpdate ? 'Update Task' : 'New Task'}
      </button>
    </div>
  )
}

TodoInput.propTypes = {
  isUpdate: PropTypes.bool,
  text: PropTypes.string,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
}
