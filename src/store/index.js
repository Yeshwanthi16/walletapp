import { configureStore } from "@reduxjs/toolkit";
import reducerFn from "./reducer";

const store = configureStore({
  reducer: reducerFn,
});

export default store;
