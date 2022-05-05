import styles from './TodoList.module.scss'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Category from '../../components/Category'
import Task from '../../components/Task'

function TodoList() {
  return (
    <div className={styles.container}>
      <Header />
      <Title label={`What's up Joy!`} isLarge />
      <Category />
      <Task />
      {/* Button */}
    </div>
  )
}

export default TodoList
