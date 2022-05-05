import styles from './TodoCategory.module.scss'

const CATEGORY = ['work', 'exercise', 'study']
export default function TodoCategory() {
  return (
    <section>
      <h3>category</h3>
      <ul className={styles.categoryInner}>
        {CATEGORY.map((cate) => {
          return <li key={`category-${cate}`}>{cate}</li>
        })}
      </ul>
    </section>
  )
}
