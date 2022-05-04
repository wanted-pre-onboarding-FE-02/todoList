import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodoDispatch, useTodoNextId } from '../TodoContext'
import styles from './TodoCreate.module.scss'

export default function TodoCreate() {
  const dispatch = useTodoDispatch()
  const nextId = useTodoNextId()
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  const handleChange = (e) => setValue(e.currentTarget.value)
  const handleAddClick = () => {
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        title: value,
        done: false,
      },
    })
    setValue('')
    nextId.current += 1
    navigate('/')
  }
  return (
    <div className={styles.todoCreate}>
      <div className={styles.textWrapper}>
        <input type='text' placeholder='Enter new task' value={value} onChange={handleChange} />
      </div>
      <button type='button' onClick={handleAddClick}>
        New tasks
      </button>
    </div>
  )
}
