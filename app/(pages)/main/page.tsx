"use client";

import React, { useState } from "react";
import ArticleList from "../../../components/ArticleList";
import { useRouter } from "next/navigation";

interface Article {
  id: number;
  url: string;
  title: string;
  content: string;
  createdAt: string;
}

const mockdata: Article[] = [
  {
    id: 1,
    url: "https://example1.com",
    title: "Example 1",
    content: "This is example 1",
    createdAt: "2021-01-01",
  },
  {
    id: 2,
    url: "https://example2.com",
    title: "Example 2",
    content: "This is example 2",
    createdAt: "2021-01-02",
  },
  {
    id: 3,
    url: "https://example3.com",
    title: "Example 3",
    content: "This is example 3",
    createdAt: "2021-01-03",
  },
];

const MainPage = () => {
  const router = useRouter();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="hidden h-full lg:block lg:pl-96">
      <div className="container mx-auto flex p-8">
        <div className={`w-full ${selectedArticle ? "md:w-2/3" : ""}`}>
          <h1 className="text-2xl font-bold mb-4">Article List</h1>
          <ArticleList
            articles={mockdata}
            onArticleClick={handleArticleClick}
          />
        </div>
        {selectedArticle && (
          <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-gray-100 p-4 overflow-auto shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedArticle.title}</h2>
            <p className="text-gray-600 mb-2">
              Date: {selectedArticle.createdAt}
            </p>
            <p className="mb-4">{selectedArticle.content}</p>
            <button
              onClick={() => router.push(selectedArticle.url)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              詳細はこちら
            </button>
            <button
              onClick={handleClose}
              className="bg-red-500 text-white p-2 ml-4 rounded-full hover:bg-red-600"
            >
              <span className="w-4 h-4">✖︎</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
