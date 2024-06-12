import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase/FirebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get("article_id");

  if (!id) {
    return NextResponse.json({ error: "Missing required parameter 'id'" }, { status: 400 });
  }

  try {
    // Query the Firestore collection for the article with the specified ID
    const q = query(collection(db, "Articles"), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    // If the article exists, return its memo field
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const articleData = docSnapshot.data();
      const memo = articleData.memo || ""; // Assuming 'memo' is a field in the article document
      return NextResponse.json({ memo }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
