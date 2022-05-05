import { configureStore } from '@reduxjs/toolkit'
import { todo } from './reducers'

const store = configureStore({ reducer: { todo } })

export default store
