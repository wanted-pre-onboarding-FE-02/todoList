import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TodoInput from 'pages/TodoInput'

export default function TodoUpdate({ todo, setEditedObj, handleModal, handleCalChange, handleSaveCategory }) {
  const [text, setText] = useState(todo.text)
  const [category, setCategory] = useState(todo.category)
  const [isLike, setIsLike] = useState(todo.isLike)
  const [date, setDate] = useState(todo.date)

  const handleChangeText = (e) => setText(e.currentTarget.value)
  const handleLike = () => setIsLike((prev) => !prev)
  const handleChangeDateTmp = (val) => {
    handleCalChange(val)
    setDate(val)
  }
  const handleChangeCategoryTmp = (val) => {
    setCategory(val)
    handleSaveCategory(val)
  }

  useEffect(() => {
    setEditedObj({
      text: text.trim(),
      category,
      isLike,
      date,
    })
  }, [category, date, isLike, setEditedObj, text])

  return (
    <TodoInput
      text={text}
      date={date}
      category={category}
      isLike={isLike}
      handleChangeText={handleChangeText}
      handleLike={handleLike}
      handleModal={handleModal}
      handleChangeDateTmp={handleChangeDateTmp}
      handleChangeCategoryTmp={handleChangeCategoryTmp}
    />
  )
}

TodoUpdate.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    done: PropTypes.bool,
    invisible: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    category: PropTypes.string,
    isLike: PropTypes.bool,
  }),
  setEditedObj: PropTypes.func,
  handleCalChange: PropTypes.func,
  handleModal: PropTypes.func,
  handleSaveCategory: PropTypes.func,
}
