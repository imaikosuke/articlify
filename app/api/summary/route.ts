import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const content = await scrapeArticleContent(url);
    const summary = await generateSummary(content);
    return NextResponse.json({ summary }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 記事の内容をスクレイピングして取得する関数
const scrapeArticleContent = async (url: string) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // <article> タグ内のテキストを取得
    const articleContent = $("article").text();

    if (!articleContent) {
      throw new Error("Failed to extract article content");
    }

    console.log("Article content:", articleContent);
    return articleContent.trim();
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
