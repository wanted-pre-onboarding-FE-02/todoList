import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TodoInput from 'pages/TodoInput'

export default function TodoCreate({
  propsCategory,
  propDate,
  setEditedObj,
  handleModal,
  handleCalChange,
  handleSaveCategory,
}) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState(propsCategory)
  const [isLike, setIsLike] = useState(false)
  const [date, setDate] = useState(propDate)

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

TodoCreate.propTypes = {
  propsCategory: PropTypes.string,
  propDate: PropTypes.instanceOf(Date),
  setEditedObj: PropTypes.func,
  handleCalChange: PropTypes.func,
  handleModal: PropTypes.func,
  handleSaveCategory: PropTypes.func,
}
