import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const folderSlice = createSlice({
  name: "folder",
  initialState: {
    folderName: "", // Update the initial state to an empty string
  },
  reducers: {
    // フォルダ名を設定するリデューサー
    setFolderName: (state, action: PayloadAction<string>) => {
      state.folderName = action.payload; // action.payloadを参照する
    },
  },
});

export const { setFolderName } = folderSlice.actions;
export default folderSlice.reducer;
