import styles from './TodoCategory.module.scss'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'

export const CATEGORY = ['work', 'exercise', 'study', 'promise', 'etc']
export default function TodoCategory({ todos }) {
  const completedTodo = todos.filter((item) => item.done === true)

  const scrollRef = useRef(null)
  const [isDrag, setIsDrag] = useState(false)
  const [startX, setStartX] = useState()

  const onDragStart = (e) => {
    e.preventDefault()
    setIsDrag(true)
    setStartX(e.pageX + scrollRef.current.scrollLeft)
  }

  const onDragEnd = () => {
    setIsDrag(false)
  }

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX
    }
  }

  return (
    <section className={styles.categoryWraper}>
      <h3>category</h3>
      <ScrollContainer className={styles.scrollContainer}>
        <ul className={styles.categoryInner}>
          {CATEGORY.map((cate) => {
            return (
              <li key={`category-${cate}`}>
                <span>{cate.length} Tasks</span>
                <h4>{cate}</h4>
                <div>
                  <p
                    style={{
                      width: `calc(100% / ${todos.length} * ${completedTodo.length} )`,
                    }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </ScrollContainer>
    </section>
  )
}

TodoCategory.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      date: PropTypes.string,
      category: PropTypes.string,
      done: PropTypes.bool,
      isLike: PropTypes.bool,
    })
  ),
}
