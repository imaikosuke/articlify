"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useUser() {
  const router = useRouter();
  const user = Cookies.get("user");
  return user;
}
