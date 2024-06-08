"use client";

import React, { useState, useEffect } from "react";
import ArticleList from "../../../components/ArticleList";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "@/lib/redux/store";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface Article {
  id: string;
  url: string;
  title: string;
  summary: string;
  created_at: string;
  tags: string[];
}

const MainPage = () => {
  const router = useRouter();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const userId = Cookies.get("user");
  const opened_folder = useSelector((state: RootState) => state.folder.folderId);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`/api/articles?user_id=${userId}&folder_id=${opened_folder}`);
        setArticles(response.data.data);
        setFilteredArticles(response.data.data); // 初期状態では全ての記事を表示
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [userId, opened_folder]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      setFilteredArticles(
        articles.filter((article) => article.tags.includes(tag) || article.tags.length === 0)
      );
    } else {
      setFilteredArticles(articles);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const uniqueTags = Array.from(new Set(articles.flatMap((article) => article.tags)));

  const Pre = ({
    children,
    ...props
  }: ClassAttributes<HTMLPreElement> &
    HTMLAttributes<HTMLPreElement> &
    ExtraProps) => {
    if (!children || typeof children !== 'object') {
      return <code {...props}>{children}</code>
    }
    const childType = 'type' in children ? children.type : ''
    if (childType !== 'code') {
      return <code {...props}>{children}</code>
    }

    const childProps = 'props' in children ? children.props : {}
    // 言語に応じてハイライトすることも可能らしいけどできなかった
    // const { className, chidren: code } = childProps
    // const language = className?.replace('language-','')
    const code = childProps.children

    return (
      <SyntaxHighlighter style={dracula}>{String(code).replace(/\n$/, '')}</SyntaxHighlighter>
    )
  }

  return (
    <div className="hidden h-full lg:block lg:pl-96">
      <div className="container mx-auto flex flex-col p-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filter by Tag:</label>
          <select
            value={selectedTag || ""}
            onChange={(e) => handleTagSelect(e.target.value || null)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Tags</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <ArticleList articles={filteredArticles} onArticleClick={handleArticleClick} />
        {selectedArticle && (
          <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-gray-100 p-4 overflow-auto shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedArticle.title}</h2>
            <p className="text-gray-600 mb-2">Date: {selectedArticle.created_at}</p>
            <h3 className="text-lg font-bold mb-2">-----------------------------</h3>
            <div className="mb-4">
              <ReactMarkdown
                components={{
                  pre: Pre,
                }}
              >
                {selectedArticle.summary}
              </ReactMarkdown>
            </div>
            <h3 className="text-lg font-bold mb-2">Tags</h3>
            <ul className="mb-4">
              {selectedArticle.tags.map((tag, index) => (
                <li
                  key={index}
                  className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded mr-2 mb-2"
                >
                  {tag}
                </li>
              ))}
            </ul>
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
