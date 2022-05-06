import styles from './TodoCategory.module.scss'
import PropTypes from 'prop-types'
import ScrollContainer from 'react-indiana-drag-scroll'
import { cx } from 'styles'

export const CATEGORY = ['work', 'exercise', 'study', 'promise', 'etc']
export default function TodoCategory({ todos }) {
  const handleCompleted = (category) => {
    const completedTodo = todos.filter((item) => item.done === true && item.category === category)
    return completedTodo.length
  }

  return (
    <section className={styles.categoryWraper}>
      <h3>category</h3>
      <ScrollContainer className={styles.scrollContainer}>
        <ul className={styles.categoryInner}>
          {CATEGORY.map((cate) => {
            return (
              <li key={`category-${cate}`}>
                <span>{cate.length}Tasks</span>
                <h4>{cate}</h4>
                <div className={cx(styles[cate])}>
                  <p
                    style={{
                      width: `calc(100% / ${todos.length} * ${handleCompleted(cate)} )`,
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
