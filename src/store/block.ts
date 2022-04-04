import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface Block {
  id: string;
  name: string;
  //   length: number;
  createdDate: string;
}

const blockSlice = createSlice({
  name: "block",
  initialState: localStorage.getItem("block")
    ? JSON.parse(localStorage.getItem("block") || "")
    : ([] as Block[]),
  reducers: {
    addBlock(state, action: PayloadAction<Block>) {
      state.push({ ...action.payload, id: uuid() });
      localStorage.setItem("block", JSON.stringify(state));
    },
    removeBlock(state, action: PayloadAction<string>) {
      const id = action.payload;
      const filteredBlock = state.filter((item: Block) => item.id !== id);
      localStorage.setItem("block", JSON.stringify(filteredBlock));
      return filteredBlock;
    },
  },
});

export const blockActions = blockSlice.actions;
export default blockSlice.reducer;
