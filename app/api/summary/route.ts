import axios from "axios";
import * as cheerio from "cheerio";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "@/lib/firebase/FirebaseConfig";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const { content, title } = await scrapeArticleContent(url);
    const summary = await generateSummary(content);
    if (!summary) {
      throw new Error("Failed to generate summary");
    }

    await saveArticleData(url, title, summary);

    return NextResponse.json({ summary }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 記事の内容とタイトルをスクレイピングして取得する関数
const scrapeArticleContent = async (url: string) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // <article> タグ内のテキストを取得
    const articleContent = $("article").text();
    const articleTitle = $("title").text();

    if (!articleContent || !articleTitle) {
      throw new Error("Failed to extract article content or title");
    }

    console.log("Article content:", articleContent);
    console.log("Article title:", articleTitle);
    return { content: articleContent.trim(), title: articleTitle.trim() };
  } catch (error) {
    console.error("Error scraping article content:", error);
    throw new Error("Failed to scrape article content");
  }
};

// OpenAI APIを使用して記事の要約を生成する関数
const generateSummary = async (content: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a handy assistant who summarizes articles in Japanese." },
        { role: "user", content: `Please summarize the following article:\n\n${content}\n\nSummary:` },
      ],
      model: "gpt-4o",
    });

    const summary = completion.choices && completion.choices[0]?.message?.content?.trim();
    console.log("Summary:", summary);
    return summary;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary");
  }
};

const saveArticleData = async (url: string, title: string, summary: string) => {
  // データベースに記事データを保存する処理
  console.log("Saving article data to database...");

  console.log(new Date());
  try {
    await addDoc(collection(db, "Articles"), {
      url,
      title,
      summary,
      created_at: new Date(),
    });
  } catch (error) {
    console.error("Error saving article data:", error);
    throw new Error("Failed to save article data");
  }
};
