import axios from "axios";
import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase/FirebaseConfig";
import { getDocs, collection, doc, deleteDoc, query, where } from "firebase/firestore";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    // 'folders' コレクションの参照
    const q = query(collection(db, "Folders"), where("uid", "==", body.uid));

    const querySnapshot = await getDocs(q);
    // querySnapshot をそのまま返す
    return NextResponse.json({
      data: querySnapshot.docs.map((doc) => doc.data()),
    });
  } catch (error) {
    // エラーレスポンスを返す
    return NextResponse.json({ error: "Failed to fetch folders" }, { status: 500 });
  }
}
