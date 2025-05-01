import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import filterReducers from "../features/filters/filterSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: filterReducers,
  },
  middleware: (getDefaultMiddlewar) => {
    return getDefaultMiddlewar().concat(apiSlice.middleware);
  },
});
