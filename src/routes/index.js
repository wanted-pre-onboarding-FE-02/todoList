import TodoApp from 'pages/TodoApp'
import styles from './Routes.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <div id='modal' />
      <TodoApp />
    </div>
  )
}

export default App
