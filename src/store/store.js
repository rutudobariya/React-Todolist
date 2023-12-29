import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './counterSlice'

export const store = configureStore({
    reducer: todoReducer
})