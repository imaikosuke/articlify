import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./folderSlice";

// ストアの設定
export const store = configureStore({
  reducer: {
    folder: folderReducer,
  },
});

// ストアの型を推論
export type AppStore = typeof store;
// RootStateの型を推論
export type RootState = ReturnType<AppStore["getState"]>;
// AppDispatchの型を推論
export type AppDispatch = AppStore["dispatch"];
