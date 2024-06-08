"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../hooks/useAuthState";
// フォルダコンポーネント
const Folder = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ul className="lg:block w-">
      <li
        onClick={toggleOpen}
        style={{ cursor: "pointer", fontWeight: "bold" }}
        className="lg:block"
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
        <Folder key={folder.id} name={folder.name}>
          {renderFolders(folder.id)}
        </Folder>
      ));
  };

  return <div>{renderFolders("")}</div>;
};

export default FolderTree;
