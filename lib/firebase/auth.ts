import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "./firebaseConfig";
import Cookies from "js-cookie";
import { collection, addDoc } from "firebase/firestore";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user.uid;
    const docRef = await addDoc(collection(db, "Users"), {
      uid: user,
    });

    Cookies.set("user", user);

    return user;
  } catch (error) {
    return error;
  }
};
