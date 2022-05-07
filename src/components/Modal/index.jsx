import PropTypes from 'prop-types'

import styles from './index.module.scss'
import Portal from 'components/Portal'

export default function Modal({ children }) {
  return (
    <Portal>
      <div className={styles.overlay}>{children}</div>
    </Portal>
  )
}

Modal.propTypes = {
  children: PropTypes.element,
}
