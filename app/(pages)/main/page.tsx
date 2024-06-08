"use client";

import React, { useState, useEffect } from "react";
import ArticleList from "../../../components/ArticleList";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

interface Article {
  id: string;
  url: string;
  title: string;
  summary: string;
  created_at: string;
}

const MainPage = () => {
  const router = useRouter();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("user");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/api/articles?user_id=${userId}`);
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [userId]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hidden h-full lg:block lg:pl-96">
      <div className="container mx-auto flex p-8">
        <div className={`w-full ${selectedArticle ? "md:w-2/3" : ""}`}>
          <h1 className="text-2xl font-bold mb-4">Article List</h1>
          <ArticleList articles={articles} onArticleClick={handleArticleClick} />
        </div>
        {selectedArticle && (
          <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-gray-100 p-4 overflow-auto shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedArticle.title}</h2>
            <p className="text-gray-600 mb-2">Date: {selectedArticle.created_at}</p>
            <h3 className="text-lg font-bold mb-2">-----------------------------</h3>
            <p className="mb-4">{selectedArticle.summary}</p>
            <button
              onClick={() => router.push(selectedArticle.url)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              詳細はこちら
            </button>
            <button
              onClick={handleClose}
              className="bg-red-500 text-white p-2 ml-4 rounded hover:bg-red-600"
            >
              <span className="w-4 h-4">閉じる</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
