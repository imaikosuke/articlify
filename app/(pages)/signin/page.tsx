"use client";

import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "../../../lib/firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Page = () => {
  const user = Cookies.get("user");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [db_user, setDb_user] = useState<any>(null);

  useEffect(() => {
    if (db_user != undefined) {
      router.push("/main");
    }
  }, [db_user, router]);

  useEffect(() => {
    if (user) {
      router.push("/main");
    }
  }, [user, router]);

  const SignInButton = async () => {
    try {
      setDb_user(await signInWithGoogle());
      router.push("/main");
    } catch (error) {
      console.error("Sign in error:", error);
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Articlify !</h1>
        <p className="mb-6">📃 技術記事を要約付きで管理をしよう 🎉</p>
        <button
          onClick={SignInButton}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Sign in with Google
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Page;
