import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFolderId, setOpenedFolders } from "@/lib/redux/folderSlice";
import { RootState } from "@/lib/redux/store";
import axios from "axios";
import { Folder } from "@/interfaces/DBinterface";

const TreeView = ({ parent_folder_id }: { parent_folder_id: string }) => {
  //親フォルダーのIDを受け取る
  //Redux系の処理
  const opened_folder = useSelector(
    (state: RootState) => state.folder.folderId
  );
  const opened_folders = useSelector(
    (state: RootState) => state.folder.openedFolders
  );
  const dispatch = useDispatch();
  const [Folders, setFolders] = useState<Folder[]>([]);

  //親フォルダーのIDを元にその子フォルダーを取得する
  useEffect(() => {
    axios
      .post("/api/folder", { parent_folder_id: parent_folder_id })
      .then((response) => {
        setFolders(response.data.data);
        console.log("response.data.data");
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [parent_folder_id]);

  const clickFolder2 = (folder_id: string) => {
    dispatch(setFolderId(folder_id));
    //クリックされたフォルダーのIDを元にその子フォルダーを取得する
    dispatch(setOpenedFolders(folder_id));
  };

  return (
    <ul className="space-y-2 ml-4">
      {Folders &&
        Folders.length > 0 &&
        Folders.map((folder) => (
          <li
            key={folder.id}
            className="text-lm"
            onClick={() => clickFolder2(folder.id)}
          >
            <span onClick={() => clickFolder2(folder.id)}>{folder.name}</span>

            {opened_folders.includes(folder.id) &&
              opened_folder === folder.id && (
                <TreeView key={folder.id} parent_folder_id={folder.id} />
              )}
          </li>
        ))}
    </ul>
  );
};

export default TreeView;

// 一応残してるだけで、使ってない
