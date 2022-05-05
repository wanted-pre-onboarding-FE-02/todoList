import { useReducer, createContext, useContext, useRef } from 'react'
import PropTypes from 'prop-types'

const initialState = {
  todos: [],
  updatedTodo: {},
}
// {
//   id: 0,
//   text: 'Todo 완성하기1',
//   done: false,
// },
// {
//   id: 1,
//   text: 'Todo 완성하기2',
//   done: false,
// },
// {
//   id: 2,
//   text: 'Todo 완성하기3',
//   done: false,
// },
// {
//   id: 3,
//   text: 'Todo 완성하기4',
//   done: true,
// },

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      }
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo)),
      }
    case 'REMOVE':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      }
    case 'UPDATE':
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.todo.id ? { ...todo, text: action.todo.text } : todo)),
      }
    case `SET_TODO`:
      return {
        ...state,
        updatedTodo: action.todo,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const TodoStateContext = createContext()
const TodoDispatchContext = createContext()
const TodoNextIdContext = createContext()

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const nextId = useRef(initialState.todos.length)
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
  return context.todos
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

const useTodoUpdated = () => {
  const context = useContext(TodoStateContext)
  if (!context) {
    throw new Error('Cannot find TodoProvider')
  }
  return context.updatedTodo
}

export { useTodoState, useTodoDispatch, useTodoNextId, useTodoUpdated }
