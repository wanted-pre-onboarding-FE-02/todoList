import React, {useState} from 'react';
import { HamburgerIcon, SearchIcon, BellIcon } from '../../../assets/svgs';
import styles from '../TodoList.module.scss';

const TodoHeader = () => {
  const [nav, setNav] = useState('');
  const [search, setSearch] = useState('');
  const [alarm, setAlarm] = useState('');


  const handleNav = (e) => {
    alert('nav');
  };
  const handleSearch = (e) => {
    alert('search');
  };
  const handleAlarm = (e) => {
    alert('alarm');
  };


  return(
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <button type="button" className={styles.btn_nav} onClick={handleNav}>
            <HamburgerIcon className={styles.icon_hamburger} alt='nav button'/>
          </button>
          <div className="right">
            <button type="button" className={styles.btn_search} onClick={handleNav}>
              <SearchIcon className={styles.icon_search} alt='search button'/>
            </button>
            <button type="button" className={styles.btn_alarm} onClick={handleNav}>
              <BellIcon className={styles.icon_bell} alt='alarm button'/>
            </button>
          </div>
        </div>
        <p className={styles.header_title}>What&apos;s up JOY!</p>
      </div>
    </header>
  )
};

export default TodoHeader;
