import { Provider } from 'react-redux'
import store from '../../redux/store'

import classes from './TodoList.module.scss'

import NavigationBar from './components/Navbar/NavigationBar'
import Main from './components/Main/Main'
import PlusBtn from './components/PlusBtn/PlusBtn'

function TodoList() {
  store.subscribe(() => {
    console.log(store.getState())
  })

  return (
    <div className={classes.wrapper}>
      <Provider store={store}>
        <NavigationBar store={store} />
        <Main />
        <PlusBtn />
      </Provider>
    </div>
  )
}

export default TodoList
