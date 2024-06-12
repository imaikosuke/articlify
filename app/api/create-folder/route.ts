import { db } from "@/lib/firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, name, uid, parent_folder_id } = body;

  if (!id || !name || !uid) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  try {
    await setDoc(doc(db, "Folders", id), {
      id,
      name,
      uid,
      parent_folder_id: parent_folder_id || "",
    });
    return NextResponse.json({ id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
