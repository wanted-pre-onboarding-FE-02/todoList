import { useState, useCallback } from 'react'

const useTodoDate = () => {
  const [date, setDate] = useState(new Date())

  const handleCalChange = setDate

  const handlePrevClick = useCallback(
    () =>
      setDate((prev) => {
        const tmpDate = new Date(prev) // prev에 직접 조작하면 안됨
        tmpDate.setDate(tmpDate.getDate() - 1)
        return tmpDate
      }),
    []
  )
  const handleNextClick = useCallback(
    () =>
      setDate((prev) => {
        const tmpDate = new Date(prev)
        tmpDate.setDate(tmpDate.getDate() + 1)
        return tmpDate
      }),
    []
  )
  return [date, { handlePrevClick, handleNextClick, handleCalChange }]
}

export default useTodoDate
