import { createSlice, nanoid } from '@reduxjs/toolkit'
const data = JSON.parse(localStorage.getItem('task')) || [];


export const todoSlice = createSlice({
    name: "ToDo",
    initialState: data,
    reducers: {
        addTodo: (state, action) => {
            state.push({ id: nanoid(), text: action.payload })
        },
        removeTodo: (state, action) => {
            return state.filter((e) => e.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todoIndex = state.findIndex((todo) => todo.id === id);

            state[todoIndex].text = text;

        }
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer