import styles from './TodoHeader.module.scss'
import { SearchIcon } from '../../assets/svgs/index'
import PropTypes from 'prop-types'

export default function TodoHeader({handleSearchTodo }) {
  return (
    <section>
      <div className={styles.headerBtns}>
        <button type='button'>
          <SearchIcon />
        </button>
        <input type='text' placeholder='search Todo...' onChange={handleSearchTodo}/>
      </div>
      <h1>Hello, Stranger</h1>
    </section>
  )
}

TodoHeader.propTypes = {
  handleSearchTodo: PropTypes.func
}