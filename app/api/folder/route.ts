import axios from "axios";
import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase/FirebaseConfig";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    // 'folders' コレクションの参照
    const querySnapshot = await getDocs(collection(db, "Folders"));

    // querySnapshot をそのまま返す
    return NextResponse.json({
      data: querySnapshot.docs.map((doc) => doc.data()),
    });
  } catch (error) {
    // エラーレスポンスを返す
    return NextResponse.json(
      { error: "Failed to fetch folders" },
      { status: 500 }
    );
  }
}
