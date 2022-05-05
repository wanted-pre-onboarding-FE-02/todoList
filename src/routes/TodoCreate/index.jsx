import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodoDispatch, useTodoNextId } from '../TodoContext'
import TodoInput from 'components/TodoInput'

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
        text: value,
        done: false,
      },
    })
    setValue('')
    nextId.current += 1
    navigate('/')
  }
  return <TodoInput text={value} handleChange={handleChange} handleClick={handleAddClick} />
}
