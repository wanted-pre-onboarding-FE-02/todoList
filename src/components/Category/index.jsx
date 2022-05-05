import styles from './styles.module.scss'
import CategoryItem from './CategoryItem'
import Title from '../Title/index'

const category = {
  title: 'Business',
  allTasks: [{}, {}, {}, {}, {}],
  finishedTasks: [{}, {}, {}],
}

function Category() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title label='CATEGORIES' />
      </div>
      <div className={styles.categoryWrapper}>
        <CategoryItem category={category} />
        <CategoryItem category={category} />
        <CategoryItem category={category} />
      </div>
    </div>
  )
}

export default Category
