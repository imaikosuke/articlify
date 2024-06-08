import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "firebase/database";

export const folderSlice = createSlice({
  name: "folder",
  initialState: {
    folderId: "", // Update the initial state to an empty string
  },
  reducers: {
    // フォルダ名を設定するリデューサー
    setFolderId: (state, action: PayloadAction<string>) => {
      state.folderId = action.payload; // action.payloadを参照する
    },
  },
});

export const { setFolderId } = folderSlice.actions;
export default folderSlice.reducer;
