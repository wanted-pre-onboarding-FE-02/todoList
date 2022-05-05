import PropTypes from 'prop-types'

import classes from './Main.module.scss'

import TodoItem from '../List/TodoItem'

import InputFormContainer from '../../containers/InputFormContainer'

function Main({ todos }) {
  return (
    <div className={classes.main}>
      <h1 className={classes.main__title}>What&apos;s up, Joy!</h1>
      <div className={classes.slider}>
        <h2 className={classes.main__category}>categories</h2>
        {/* <div className={classes.slider__content}>슬라이더</div> */}
        <InputFormContainer />
      </div>
      <div className={classes.list}>
        <h2 className={classes.main__category}>Today&apos;s Tasks</h2>
        <ul className={classes.list__content}>
          {todos.map((item, i) => (
            <TodoItem item={item} key={`item-${i}`} />
          ))}
        </ul>
      </div>
    </div>
  )
}

Main.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })
  ),
}

export default Main
