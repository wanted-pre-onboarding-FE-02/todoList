import styles from './styles.module.scss'
import { cx } from '../../styles/index'

function Title({ label, isLarge = false }) {
  return (
    <div className={cx(styles.container, isLarge && styles.largeContainer)}>
      <p className={cx(styles.title, isLarge && styles.largeTitle)}>{label}</p>
    </div>
  )
}

export default Title
