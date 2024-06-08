import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./FirebaseConfig";
import Cookies from "js-cookie";

export const signInWithGoogle = async () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user.uid;
      Cookies.set("user", user);
    })
    .catch((error) => {
      console.log(error);
    });
};
