import React from "react";
import FolderTree from "./FolderTree";

const FolderList = () => {
  return (
    <div className="fixed pt-20 pb-20 lg:pb-0 lg:px-8 lg:w-96 lg:block overflow-y-auto border-r border-border block w-full left-0 h-full">
      <FolderTree />
    </div>
  );
};

export default FolderList;
