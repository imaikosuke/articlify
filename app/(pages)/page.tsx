"use client";
import SignOutButton from "../../ui/SignOutButton";
import { useUser } from "../../hooks/useAuthState";

export default function Home() {
  const user: any = useUser();
  console.log(user);

  return (
    <div>
      <h1>Home</h1>
      <SignOutButton />
    </div>
  );
}
