import axios from "axios";
import * as cheerio from "cheerio";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { db } from "@/lib/firebase/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();
  const { url, user_id, parent_folder_id = "" } = body; // フォルダIDを取得、デフォルトは空文字

  if (!url || !user_id) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  try {
    let articleData;
    if (url.includes("qiita.com")) {
      articleData = await getArticleFromQiita(url);
    } else {
      articleData = await scrapeArticleContent(url);
    }

    let { content, title, tags } = articleData;

    // "ZennZenn" をタイトルから除去
    if (title.endsWith("ZennZenn")) {
      title = title.replace(/ZennZenn$/, "").trim();
    }

    const summary = await generateSummary(content);
    if (!summary) {
      throw new Error("Failed to generate summary");
    }

    await saveArticleData(user_id, parent_folder_id, url, title, summary, tags); // フォルダIDを追加

    return NextResponse.json({ summary }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Qiitaの記事情報を取得する関数
const getArticleFromQiita = async (url: string) => {
  const articleId = url.split("/").pop(); // URLから記事IDを抽出

  if (!articleId) {
    throw new Error("Invalid Qiita article URL");
  }

  const apiUrl = `https://qiita.com/api/v2/items/${articleId}`;
  const headers = {
    Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
  };

  try {
    const response = await axios.get(apiUrl, { headers });
    const { title, body, tags } = response.data;
    const tagNames = tags.map((tag: any) => tag.name);

    return {
      title,
      content: body,
      tags: tagNames,
    };
  } catch (error) {
    console.error("Error fetching Qiita article:", error);
    throw new Error("Failed to fetch Qiita article");
  }
};

// 記事の内容とタイトルをスクレイピングして取得する関数
const scrapeArticleContent = async (url: string) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // <article> タグ内のテキストを取得
    const articleContent = $("article").text();
    const articleTitle = $("title").text();

    // Zennの記事からタグを取得
    const tags: string[] = [];
    $(".View_topicName____nYp").each((index, element) => {
      tags.push($(element).text().trim());
    });

    if (!articleContent || !articleTitle) {
      throw new Error("Failed to extract article content or title");
    }

    console.log("Tags:", tags);
    return { content: articleContent.trim(), title: articleTitle.trim(), tags };
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
        {
          role: "system",
          content:
            "You are a handy assistant who summarizes articles in Japanese.",
        },
        {
          role: "user",
          content: `Please summarize the following article:\n\n${content}\n\nSummary:`,
        },
      ],
      model: "gpt-4o",
    });

    const summary =
      completion.choices && completion.choices[0]?.message?.content?.trim();
    console.log("Summary:", summary);
    return summary;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary");
  }
};

// Firestoreに記事データを保存する関数
const saveArticleData = async (
  user_id: string,
  parent_folder_id: string, // フォルダIDを追加
  url: string,
  title: string,
  summary: string,
  tags: string[]
) => {
  // データベースに記事データを保存する処理
  console.log("Saving article data to database...");
  const createdAt = new Date();
  const formattedDate = `${createdAt.getFullYear()}-${String(
    createdAt.getMonth() + 1
  ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(2, "0")}`;
  const id = uuidv4();

  try {
    await addDoc(collection(db, "Articles"), {
      id,
      user_id,
      parent_folder_id, // フォルダIDを保存
      url,
      title,
      summary,
      tags, // タグを保存
      created_at: formattedDate,
    });
  } catch (error) {
    console.error("Error saving article data:", error);
    throw new Error("Failed to save article data");
  }
};
