"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFolderId } from "@/lib/redux/folderSlice";
import { setFolders } from "@/lib/redux/folderSlice";
import axios from "axios";
import { useUser } from "../hooks/useAuthState";
// フォルダコンポーネント
const Folder = ({ folder_id, name, children }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // クリックされたときにフォルダのIDを取得して子要素を取得する処理を追加
    dispatch(setFolderId(folder_id));
  };

  return (
    <ul className="lg:block mt-2">
      <li
        onClick={toggleOpen}
        style={{ cursor: "pointer", fontWeight: "bold" }}
        className="lg:block text-xl"
      >
        {isOpen ? "📂" : "📁"} {name}
      </li>
      {isOpen && <div style={{ marginLeft: 20 }}>{children}</div>}
    </ul>
  );
};

// フォルダツリーコンポーネント
const FolderTree = () => {
  const uid = useUser();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    // データベースからデータを取得するフェッチ関数
    axios.post("/api/folder", { uid: uid }).then((res) => {
      setFolders(res.data.data);
    });
  }, []);

  // フォルダ構造を再帰的にレンダリングする関数
  const renderFolders = (parentId) => {
    if (!Array.isArray(folders)) {
      return null; // エラー処理または何も表示しない場合の適切な処理を行う
    }

    return folders
      .filter((folder) => folder.parent_folder_id === parentId)
      .map((folder) => (
        <Folder key={folder.id} name={folder.name} folder_id={folder.id}>
          {renderFolders(folder.id)}
        </Folder>
      ));
  };

  return <div className="mx-8">{renderFolders("")}</div>;
};

export default FolderTree;
