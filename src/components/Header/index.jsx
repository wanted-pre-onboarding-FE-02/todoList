import styles from './styles.module.scss'
import { Menu, Search, Alarm } from '../../assets/svgs/index'

function Header() {
  return (
    <div className={styles.container}>
      <Menu fill='currentColor' stroke='currentColor' className={styles.menuIcon} />
      <div className={styles.icon_wrapper}>
        <Search className={styles.searchIcon} fill='currentColor' stroke='currentColor' />
        <Alarm className={styles.alarmIcon} fill='currentColor' stroke='currentColor' />
      </div>
    </div>
  )
}

export default Header
