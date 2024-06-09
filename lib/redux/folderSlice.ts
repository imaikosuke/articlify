import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { set } from "firebase/database";

export const folderSlice = createSlice({
  name: "folder",
  initialState: {
    folderId: "", // Update the initial state to an empty string
    folders: [],
  },
  reducers: {
    // フォルダ名を設定するリデューサー
    setFolderId: (state, action: PayloadAction<string>) => {
      state.folderId = action.payload; // action.payloadを参照する
    },
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
  },
});

export const { setFolderId, setFolders } = folderSlice.actions;
export default folderSlice.reducer;
