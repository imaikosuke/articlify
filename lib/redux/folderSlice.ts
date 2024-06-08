import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "firebase/database";

export const folderSlice = createSlice({
  name: "folder",
  initialState: {
    folderId: "", // Update the initial state to an empty string
    openedFolders: [] as string[],
  },
  reducers: {
    // フォルダ名を設定するリデューサー
    setFolderId: (state, action: PayloadAction<string>) => {
      state.folderId = action.payload; // action.payloadを参照する
    },
    setOpenedFolders: (state, action: PayloadAction<string>) => {
      if (state.openedFolders.includes(action.payload)) {
        const index = state.openedFolders.indexOf(action.payload);
        state.openedFolders.splice(index, 1);
      } else {
        state.openedFolders.push(action.payload);
      }
    },
  },
});

export const { setFolderId, setOpenedFolders } = folderSlice.actions;
export default folderSlice.reducer;
