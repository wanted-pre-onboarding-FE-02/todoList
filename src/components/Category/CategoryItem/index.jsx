import styles from './styles.module.scss'

function CategoryItem({ category }) {
  const { title, allTasks } = category

  return (
    <div className={styles.container}>
      <p className={styles.taskCount}>{allTasks.length} tasks</p>
      <p className={styles.taskTitle}>{title}</p>
      {/* Progress Bar */}
    </div>
  )
}

export default CategoryItem
