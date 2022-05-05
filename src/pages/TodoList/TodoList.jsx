import React, { useState, useRef} from 'react';
import TodoHeader from './components/TodoHeader';
import TodoCategories from './components/TodoCategories';
import TodoTasks from './components/TodoTasks';
import styles from './TodoList.module.scss';

function TodoList() {
  return (
    <div className={styles.container}>
      <TodoHeader/>
      <TodoCategories/>
      <TodoTasks/>
    </div>
  )
}

export default TodoList

