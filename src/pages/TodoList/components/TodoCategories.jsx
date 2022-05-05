import React, {useState} from 'react';
import styles from '../TodoList.module.scss';

const TodoCategories = () => {
  const [nav, setNav] = useState('');
  const [search, setSearch] = useState('');
  const [alarm, setAlarm] = useState('');


  // const handleNav = (e) => {
  //   alert('nav');
  // };

  return(
    <div className={styles.category}>
      <p className={styles.task_title}>CATEGORIES</p>
      <ul className={styles.list_slider}>
        <li className={`${styles.item} ${styles.business}`}>
          <span className={styles.text_count}>40 tasks</span>
          <p className={styles.text_category}>Business</p>
          <div className={styles.progress}>
            <span className={`${styles.progress_bar} ${styles.purple}`}>70%</span>
          </div>
        </li>
      </ul>
    </div>
  )
};

export default TodoCategories;
