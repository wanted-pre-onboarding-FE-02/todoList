import React, {useState} from 'react';
// import { CloseXmark } from '../../../assets/svgs';
import styles from '../TodoList.module.scss';
// import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const TodoCreate = () => {
  const [nav, setNav] = useState('');
  const [search, setSearch] = useState('');
  const [alarm, setAlarm] = useState('');
  // const dispatch = useTodoDispatch();


  const onSubmitForm = (e) => {
    e.preventDefault();
  };


  return(
    <div className={`${styles.layer} ${styles.layer_create}`}>
      <div className={styles.layer_inner}>
        <button type="button" className={styles.close}>close</button>
        <form action="" onSubmit={onSubmitForm}>
          <input type="text" placeholder="Enter new task" />
          {/* <select name="" id="">
            <option value="business">business</option>
            <option value="personal">personal</option>
            <option value="study">study</option>
          </select> */}
          <button type="button" className={styles.create_task_btn}>New task</button>
        </form>
      </div>

    </div>
  )
};

export default TodoCreate;
