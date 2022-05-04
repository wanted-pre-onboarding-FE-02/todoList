import PropTypes from 'prop-types'
import styles from './TodoItem.module.scss'
import { CheckIcon } from '../../assets/svgs'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

export default function TodoItem({ id, done, title, onChange }) {
  return (
    <li className={styles.task}>
      <div className={styles.checkboxWrapper}>
        <input type='checkbox' checked={done} data-id={id} onChange={onChange} />
        <CheckIcon />
      </div>
      <p className={styles.title}>{title}</p>
    </li>
  )
}

TodoItem.propTypes = {
  id: PropTypes.number,
  done: PropTypes.bool,
  title: PropTypes.string,
  onChange: PropTypes.func,
}

// <li>
// <span>
//   <FontAwesomeIcon icon={faCircle} />
// </span>
// <span>{content}</span>
// <span>
//   <FontAwesomeIcon icon={faTrashAlt} />
// </span>
// </li>
