import { deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/FirebaseConfig";

export async function POST(req: Request) {
  const body = await req.json();
  const { article_id } = body;

  if (!article_id) {
    return NextResponse.json({ error: "Missing required parameter 'article_id'" }, { status: 400 });
  }

  try {
    const articleRef = doc(db, "Articles", article_id);
    await deleteDoc(articleRef);
    return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
