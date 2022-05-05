import { useState } from 'react'
import styles from './TodoList.module.scss'
import { CheckIcon, EditIcon, TrashIcon } from '../../assets/svgs'
import Modal from '../../components/Modal/Modal'


function TodoList() {
  
  const [taskList, setTaskList] = useState([])
  const [filtering, setFiltering]= useState([])
  const [complete, setComplete] = useState(0)
  const [showModal, setShowModal] = useState(false)
  
  const createTaskHandler = (taskText) => {
    const newData = {
      id: Date.now(),
      title: taskText,
      done:false
    }
    setTaskList((prev) => { return [newData, ...prev] })
    setShowModal(false)
  }

  const deleteTaskHandler = (ID) => {
    const reload = taskList.filter(task => task.id !== ID)
    setTaskList(prev => reload)
    const completeTask = taskList.filter(task => task.done === true).length
    setComplete(completeTask)
  }

  const EditTaskHandler = (ID) => {
    
   }
  const doneTaskHandler = (ID) => {
    taskList.map(task => {
      if (task.id === ID) {
        task.done=!task.done
      }
    })
    const completeTask = taskList.filter(task=>task.done===true).length
    setTaskList(prev => taskList)
    setComplete(completeTask)
  }

  const searchTaskHandler = (e) => {
    if (e.currentTarget.value.length === 0) {
      console.log(taskList)
    }
    if (e.currentTarget.value) {
      const filterTask = taskList.filter(task => task.title.includes(e.currentTarget.value))
      console.log(filterTask)
    }
  }

  const showModalHandler = () => {
    setShowModal(prev=>true)
  }
  const closeModalHandler = () => {
    setShowModal(prev=>false)
  }
  return (
    <>
      <div className={styles.todoList}>
        <h1>Whats up, Joy!</h1>
        <p className={styles.tasksTitle}>PROGRESS...</p>
        <div className={styles.progressBox}>
          <progress className={styles.progressBar} value={Math.round(complete * 100 / taskList.length)} max='100' />
          {taskList.length > 0 ? <p>{Math.round(complete * 100 / taskList.length)}%</p> : <p>0%</p>}
        </div>
        <p className={styles.tasksTitle}>TODAYS TASKS</p>
        <input type='text' placeholder='search...' onChange={searchTaskHandler} />
        <ul className={styles.tasks}>
          {taskList.map((todo) => (
            <li key={todo.id} className={styles.task}>
              <div className={styles.checkboxWrapper}>
                <input type='checkbox' onChange={() => doneTaskHandler(todo.id)} />
                <CheckIcon />
              </div>
              <p className={todo.done ? styles.doneTitle : styles.title}>{todo.title}</p>
              <EditIcon onClick={() => EditTaskHandler(todo.id)} />
              <TrashIcon onClick={() => deleteTaskHandler(todo.id)} />
            </li>
          ))}
        </ul>
        <button type='button' className={styles.addButton} onClick={showModalHandler} aria-label='Add button' />

      </div>
      {showModal && <Modal createTask={createTaskHandler} closeModal={closeModalHandler} />}
    </>
  )
}

export default TodoList
