import classes from './Main.module.scss'

import TodoItem from '../List/TodoItem'

const DUMMY_TODOS = [
  { id: 1, todo: 'Daily meeing with team', checked: false },
  { id: 1, todo: 'Pay for rent', checked: false },
  { id: 3, todo: 'Check emails', checked: false },
  { id: 4, todo: 'Lunch with Emma', checked: false },
  { id: 5, todo: 'Meditation', checked: true },
]

function Main() {
  return (
    <div className={classes.main}>
      <h1 className={classes.main__title}>What&apos;s up, Joy!</h1>
      <div className={classes.slider}>
        <h2 className={classes.main__category}>categories</h2>
        <div className={classes.slider__content}>슬라이더</div>
      </div>
      <div className={classes.list}>
        <h2 className={classes.main__category}>Today&apos;s Tasks</h2>
        <ul className={classes.list__content}>
          {DUMMY_TODOS.map((item) => (
            <TodoItem item={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Main
