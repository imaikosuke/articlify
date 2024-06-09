"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/hooks/useAuthState";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";

const ClickMenu = ({
  position: { x, y },
  toggle,
  article_id,
}: {
  position: { x: number; y: number };
  toggle: (visible: boolean) => void;
  article_id: string;
}) => {
  const uid = useUser();
  const dispatch = useDispatch();
  const [folders, setFolders] = useState([]);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: x,
    y: y,
  });

  useEffect(() => {
    // データベースからデータを取得するフェッチ関数
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/folder", { uid: uid });
        setFolders(res.data.data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchData();
  }, []);

  const moveBy = (folderId: string) => {
    console.log(folderId);
    // フォルダーを移動する処理
    axios
      .post("/api/move", { folderId: folderId, articleId: article_id })
      .then((res) => {
        console.log(res);
        alert("移動が成功しました");
      })
      .catch((error) => {
        console.error("移動中にエラーが発生しました:", error);
        alert("移動中にエラーが発生しました");
      });
    toggle(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: contextMenuPosition.x,
        top: contextMenuPosition.y,
        backgroundColor: "white",
        border: "1px solid black",
        zIndex: 1000,
        textAlign: "center",
      }}
      className="p-4 w-36"
    >
      <h1 className="text-sm mb-4 border-b-2">フォルダ移動</h1>
      <ul>
        {folders.map((folder: any) => (
          <li
            key={folder.id}
            className="hover:bg-blue-300"
            onClick={() => moveBy(folder.id)}
          >
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClickMenu;
