import classes from './TodoList.module.scss'

import NavigationBar from './components/Navbar/NavigationBar'
import Main from './components/Main/Main'
import PlusBtn from './components/PlusBtn/PlusBtn'

function TodoList() {
  return (
    <div className={classes.wrapper}>
      <NavigationBar />
      <Main />
      <PlusBtn />
    </div>
  )
}

export default TodoList
