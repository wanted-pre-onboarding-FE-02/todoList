import React, {useState} from 'react';
import { CirclePlus } from '../../../assets/svgs';
import styles from '../TodoList.module.scss';

const TodoHeader = () => {
  // const [nav, setNav] = useState('');
  // const [search, setSearch] = useState('');
  // const [alarm, setAlarm] = useState('');


  // const handleNav = (e) => {
  //   alert('nav');
  // };



  return(
    <div className={styles.tasks}>
      <div className={styles.inner}>
        <p className={styles.task_title}>TODAY&apos;S TASKS</p>
        <ul className={styles.appList}>
          <li className={`${styles.item} ${styles.business}`}>
            <div className={styles.checkbox}>
              <input type="checkbox" id="item_1" className={styles.hidden}/>
              <label htmlFor="item_1"/>
            </div>
            <span className={styles.task_text}>Daily meeting with team</span>
          </li>
        </ul>
      </div>
      <button type="button" className={styles.addBtn}>
        <CirclePlus className={styles.icon_add} alt='add todo'/>
      </button>
    </div>
  )
};

export default TodoHeader;