import TodoApp from 'pages/TodoApp'
import styles from './Routes.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <TodoApp />
      <div id='modal' />
    </div>
  )
}

export default App
