import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodoDispatch, useTodoUpdated } from '../TodoContext'
import TodoInput from 'components/TodoInput'

export default function TodoCreate() {
  const dispatch = useTodoDispatch()
  const updateTodo = useTodoUpdated()
  const navigate = useNavigate()
  const [value, setValue] = useState(updateTodo.text || '')

  const handleChange = (e) => setValue(e.currentTarget.value)
  const handleUpdateClick = () => {
    dispatch({
      type: 'UPDATE',
      todo: {
        ...updateTodo,
        text: value,
      },
    })
    setValue('')
    navigate('/')
  }
  return <TodoInput isUpdate text={value} handleChange={handleChange} handleClick={handleUpdateClick} />
}
