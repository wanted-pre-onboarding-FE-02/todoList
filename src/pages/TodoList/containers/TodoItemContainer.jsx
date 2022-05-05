import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toggleCheck } from '../../../redux/actions'
import PropTypes from 'prop-types'

import TodoItem from '../components/List/TodoItem'

export default function TodoItemContainer({ item }) {
  const dispatch = useDispatch()
  const toggle = useCallback(
    (todo) => {
      dispatch(toggleCheck(todo))
    },
    [dispatch]
  )

  return <TodoItem toggle={toggle} item={item} />
}

TodoItemContainer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    todo: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
}
