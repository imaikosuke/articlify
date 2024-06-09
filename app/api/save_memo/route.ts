import axios from "axios";
import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase/FirebaseConfig";
import {
  getDocs,
  getDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();
  const { articleId, memo } = body;
  console.log("article_id", articleId);
  try {
    // ドキュメントの参照を取得
    const q = query(collection(db, "Articles"), where("id", "==", articleId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      console.log("Document data:", docSnapshot.data());
      const docRef = doc(db, "Articles", docSnapshot.id);
      // memo を更新する
      await updateDoc(docRef, {
        memo: memo,
      });

      console.log("memo を更新しました");
      return NextResponse.json({
        message: "memo を更新しました",
      });
    } else {
      console.log("該当の記事が見つかりませんでした");
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
