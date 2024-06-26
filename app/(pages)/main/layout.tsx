"use client";
import React from "react";
import FolderList from "@/components/FolderList";
import { Provider } from "react-redux";
import { store } from "../../../lib/redux/store";
import UserMenu from "@/components/UserMenu";
import Image from "next/image";
import articlifyIcon from "/public/articlify.png";

const MessageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <div className="h-full">
        <header className="fixed   left-12 z-10 flex items-center text-4xl font-bold">
          <Image src={articlifyIcon} alt="Articlify Icon" width={80} height={80} className="mr-2" />
          <h1>Articlify</h1>
        </header>
        <div className="h-full">
          <FolderList />
          {children}
          <UserMenu />
        </div>
      </div>
    </Provider>
  );
};

export default MessageLayout;
