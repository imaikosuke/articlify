"use client";
import { useUser } from "../../hooks/useAuthState";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/main");
  const user: any = useUser();
  console.log(user);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
