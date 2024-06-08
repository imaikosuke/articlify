"use client";
import React from "react";
import FolderList from "@/components/FolderList";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../../lib/redux/store";

const MessageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [folder, setSelectedFolder] = useState<string | null>(null);
  return (
    <Provider store={store}>
      <div className="h-full">
        <div className="h-full">
          <FolderList />
          {children}
        </div>
      </div>
    </Provider>
  );
};

export default MessageLayout;
