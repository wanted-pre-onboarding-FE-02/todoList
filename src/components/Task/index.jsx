import styles from './styles.module.scss'
import Title from '../Title'
import TaskItem from './TaskItem'

const Tasks = [
  { label: '이메일 확인', isDone: false, id: 1 },
  { label: '전화하기', isDone: false, id: 2 },
  { label: '서류 제출', isDone: false, id: 3 },
]

function Task() {
  return (
    <div className={styles.container}>
      <Title label={`Today's Tasks`} />
      {Tasks.map((task, i) => {
        const key = `task-${i}`
        return <TaskItem task={task} key={key} />
      })}
    </div>
  )
}

export default Task
