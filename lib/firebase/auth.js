import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./FirebaseConfig";
import Cookies from "js-cookie";

export const signInWithGoogle = async () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      const jsonData = JSON.stringify(user);
      Cookies.set("user", jsonData);
    })
    .catch((error) => {
      console.log(error);
    });
};
