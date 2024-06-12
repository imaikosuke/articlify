import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase/FirebaseConfig";
import { getDocs, collection, doc, updateDoc, query, where } from "firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();
  const { articleId, memo } = body;
  try {
    // ドキュメントの参照を取得
    const q = query(collection(db, "Articles"), where("id", "==", articleId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const docRef = doc(db, "Articles", docSnapshot.id);
      // memo を更新する
      await updateDoc(docRef, {
        memo: memo,
      });

      return NextResponse.json({
        message: "memo を更新しました",
      });
    } else {
      return NextResponse.json(
        {
          error: "該当の記事が見つかりませんでした",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.error("エラー:", error);
    return NextResponse.json(
      {
        error: "エラーが発生しました",
      },
      {
        status: 500,
      }
    );
  }
}
