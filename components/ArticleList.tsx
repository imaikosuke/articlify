"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ClickMenu from "./ClickMenu";

interface Article {
  id: string;
  url: string;
  title: string;
  summary: string;
  created_at: string;
  tags: string[];
}

interface ArticleListProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  onArticleClick,
}) => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const handleContextMenu = (event: any) => {
    event.preventDefault();
    setContextMenuVisible(!contextMenuVisible);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setContextMenuVisible(false);
    }
  };
  useEffect(() => {
    if (contextMenuVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // クリーンアップ関数
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenuVisible]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex border-b py-2 font-bold">
        <div className="w-1/3">
          <span>Date</span>
        </div>
        <div className="w-2/3">
          <span>Title</span>
        </div>
      </div>
      {articles.map((article) => (
        <div key={article.id} className="flex">
          <div
            className="border-b py-2 hover:bg-blue-100 cursor-pointer w-5/6"
            onClick={() => onArticleClick(article)}
          >
            <div className="w-1/3">
              <span className="text-gray-600">{article.created_at}</span>
            </div>
            <div className="w-2/3">
              <span className="text-gray-600">{article.title}</span>
            </div>
          </div>
          <button onClick={handleContextMenu} className="z-10 w-1/6">
            <Image src="/move.png" alt="Button Image" width="30" height="30" />
          </button>

          {contextMenuVisible && (
            <div ref={menuRef}>
              <ClickMenu
                position={contextMenuPosition}
                toggle={setContextMenuVisible}
                article_id={article.id}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
