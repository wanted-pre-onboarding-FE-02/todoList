import { useReducer, createContext, useContext, useRef } from 'react'
import PropTypes from 'prop-types'

const initialTodos = [
  // {
  //   id: 0,
  //   title: 'Todo 완성하기1',
  //   done: false,
  // },
  // {
  //   id: 1,
  //   title: 'Todo 완성하기2',
  //   done: false,
  // },
  // {
  //   id: 2,
  //   title: 'Todo 완성하기3',
  //   done: false,
  // },
  // {
  //   id: 3,
  //   title: 'Todo 완성하기4',
  //   done: true,
  // },
]

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo)
    case 'TOGGLE':
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo))
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id)
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const TodoStateContext = createContext()
const TodoDispatchContext = createContext()
const TodoNextIdContext = createContext()

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos)
  const nextId = useRef(initialTodos.length)
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  )
}

TodoProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

const useTodoState = () => {
  const context = useContext(TodoStateContext)
  if (!context) {
    throw new Error('Cannot find TodoProvider')
  }
  return context
}

const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext)
  if (!context) {
    throw new Error('Cannot find TodoProvider')
  }
  return context
}

const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext)
  if (!context) {
    throw new Error('Cannot find TodoProvider')
  }
  return context
}

export { useTodoState, useTodoDispatch, useTodoNextId }
