import styles from './TodoCategory.module.scss'
import PropTypes from 'prop-types'

export const CATEGORY = ['work', 'exercise', 'study', 'promise', 'etc']
export default function TodoCategory({ todos }) {
  const completedTodo = todos.filter((item) => item.done === true)

  return (
    <section className={styles.categoryWraper}>
      <h3>category</h3>
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
