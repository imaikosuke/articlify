import React from "react";
import { auth } from "../lib/firebase/FirebaseConfig";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      await auth.signOut();
      Cookies.remove("user");
    } catch (error) {
      console.error("Sign out error:", error);
    }

    if (Cookies.get("user") === undefined) {
      router.push("/signin");
    }
  };
  return <button onClick={signOut}>Sign out</button>;
};

export default SignOutButton;
