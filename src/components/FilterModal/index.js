import PropTypes from 'prop-types'
import styles from './FilterModal.module.scss'

function FilterModal({ onSelectFilter, filterList }) {
  return (
    <div className={styles.modal}>
      {filterList.map((filter) => (
        <button type='button' className={styles.modal__button} onClick={onSelectFilter}>
          {filter}
        </button>
      ))}
    </div>
  )
}

FilterModal.propTypes = {
  onSelectFilter: PropTypes.func.isRequired,
  filterList: PropTypes.arrayOf(PropTypes.string),
}

export default FilterModal
