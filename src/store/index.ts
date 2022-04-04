import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo";
import blockReducer from "./block";

const store = configureStore({
  reducer: { todo: todoReducer, block: blockReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
