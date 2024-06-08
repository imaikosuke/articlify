import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/FirebaseConfig";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "Missing user_id parameter" }, { status: 400 });
  }

  try {
    // Firebaseのデータベースからuser_idが一致するドキュメントを取得
    const q = query(collection(db, "Articles"), where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        created_at: data.created_at,
      };
    });

    // 記事データを返す
    return NextResponse.json({ data: articles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
