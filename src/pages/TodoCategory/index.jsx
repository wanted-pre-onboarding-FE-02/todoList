import styles from './TodoCategory.module.scss'
import PropTypes from 'prop-types'
import ScrollContainer from 'react-indiana-drag-scroll'
import { cx } from 'styles'

export const CATEGORY = ['all', 'work', 'exercise', 'study', 'promise', 'etc']

// eslint-disable-next-line react/prop-types
export default function TodoCategory({ handleCategory, todos }) {
  const handleCompleted = (category) => {
    if (category === 'all') {
      const allTodo = todos.filter((item) => item.done === true)
      return allTodo.length
    }
    const completedTodo = todos.filter((item) => item.done === true && item.category === category)
    return completedTodo.length
  }

  const handleCategoryTasks = (category) => {
    if (category === 'all') {
      return todos.length
    }
    const categoryTasks = todos.filter((item) => item.category === category)
    return categoryTasks.length
  }

  return (
    <section className={styles.categoryWraper}>
      <h3>category</h3>
      <ScrollContainer className={styles.scrollContainer}>
        <ul className={styles.categoryInner}>
          {CATEGORY.map((item) => {
            return (
              <li key={item}>
                <button type='button' onClick={handleCategory} value={item}>
                  <span>{handleCategoryTasks(item)}Tasks</span>
                  <h4>{item}</h4>
                  <div className={cx(styles[item])}>
                    <p
                      style={{
                        width:
                          todos.length !== 0 ? `calc(100% / ${todos.length} * ${handleCompleted(item)} )` : `calc(0%)`,
                      }}
                    />
                  </div>
                </button>
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
