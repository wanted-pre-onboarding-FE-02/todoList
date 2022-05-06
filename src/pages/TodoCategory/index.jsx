import styles from './TodoCategory.module.scss'

// const CATEGORY = ['work', 'exercise', 'study', 'clean']
const CATEGORY = [
  {
    'title' : 'all',
    'category' : ''
  },
  {
    'title' : 'work',
    'category' : 'red'
  },
  {
    'title' : 'exercise',
    'category' : 'orange'
  },
  {
    'title' : 'study',
    'category' : 'yellow'
  },
  {
    'title' : 'clean',
    'category' : 'green'
  },
]
export default function TodoCategory({ handleCategory }) {
  return (
    <section>
      <h3>category</h3>
      <ul className={styles.categoryInner}>
        {CATEGORY.map(({title, category}) => {
          return (
            <li key={title}>
              <button 
                type="button" 
                onClick={handleCategory} 
                value={category}>
                {title}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
