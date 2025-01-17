import { configureStore } from "@reduxjs/toolkit";
import { productosSlice } from "./Productos/productosSlice";
import { AuthSlice } from "./AuthSlice/AuthSlice";

export const store = configureStore({
  reducer:{
    productos: productosSlice.reducer,
    auth: AuthSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch