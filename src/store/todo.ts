import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface Todo {
  id: string;
  text: string;
}
const todoSlice = createSlice({
  name: "todo",
  initialState: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos") || "")
    : ([] as Todo[]),
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.push({ ...action.payload, id: uuid() });
      localStorage.setItem("todos", JSON.stringify(state));
    },
    removeTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      const filteredTodos = state.filter((item: Todo) => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return filteredTodos;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
