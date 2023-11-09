import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";

const store = configureStore({
  reducer: {
    // redux Slices
    boards: boardsSlice.reducer,
  },
});

export default store;
