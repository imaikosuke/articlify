"use client";
import React, { use } from "react";
import { signInWithGoogle } from "../../lib/firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "../../hooks/useAuthState";

const Page = () => {
  const user = useUser();
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  let redirectRequired = false;
  const SignInButton = async () => {
    try {
      await signInWithGoogle();
      redirectRequired = true;
    } catch (error) {
      console.error("Sign in error:", error);
    }
    if (redirectRequired) {
      // サインイン成功後にリダイレクト
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={SignInButton}>Sign in with Google</button>
    </div>
  );
};

export default Page;
