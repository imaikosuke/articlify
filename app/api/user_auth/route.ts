import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase/firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    // ドキュメントの参照を取得
    const q = query(collection(db, "Users"), where("uid", "==", body.uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      return NextResponse.json({
        data: docSnapshot.data(),
      });
    } else {
      return NextResponse.json(
        {
          error: "Document not found",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    // エラーレスポンスを返す
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
