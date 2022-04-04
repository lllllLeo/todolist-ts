import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface Todo {
  id: string;
  content: string;
  name: string;
  startDate: string;
  endDate: string;
  estimatedTime: string;
  elapsedTime: string;
  blockId: string;
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
    setTodo(state, action: PayloadAction<any>) {
      const reorderedItems = action.payload;
      const blockId = reorderedItems[0].blockId;
      const a = current(state).filter((item: Todo) => item.blockId !== blockId);
      const todoList = [...a, ...reorderedItems];
      localStorage.setItem("todos", JSON.stringify(todoList));
      return todoList;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
