import { useCallback, useState } from 'react'

function useDragDrop(todos) {
  const [todoList, setTodoList] = useState(todos)
  const [startId, setStartId] = useState(-1)
  const [nextIndex, setNextIndex] = useState(Number.MAX_SAFE_INTEGER)

  const handleDragStart = useCallback((e) => {
    e.stopPropagation()
    const { id } = e.currentTarget

    e.dataTransfer.setData('list_id', id)
    setTimeout(() => {
      e.target.style.display = 'none'
      return true
    }, 0)

    setStartId(id)
  }, [])

  const handleDragEnter = useCallback(
    (e) => {
      e.preventDefault()
      const { id } = e.currentTarget

      const newNextIndex = todoList.findIndex((el) => el.id === Number(id))
      if (newNextIndex === nextIndex) return

      setNextIndex(newNextIndex)

      const copiedList = [...todoList]
      const startIndex = copiedList.findIndex((el) => el.id === Number(startId))
      const startEl = copiedList.find((el) => el.id === Number(startId))

      copiedList.splice(startIndex, 1)
      copiedList.splice(newNextIndex, 0, startEl)
      setTodoList(copiedList)
    },
    [todoList, startId, nextIndex]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleDragEnd = useCallback((e) => {
    if (e.target.style.display === 'none') {
      e.target.style.display = 'flex'
    }

    setNextIndex(Number.MAX_SAFE_INTEGER)
    setStartId(-1)
  }, [])

  const handleDrop = useCallback((e) => {
    const id = e.dataTransfer.getData('list_id')
    const list = document.getElementById(id)
    list.style.display = 'flex'
  }, [])

  return [handleDragEnd, handleDragEnter, handleDragOver, handleDragStart, handleDrop, todoList, nextIndex]
}

export default useDragDrop
