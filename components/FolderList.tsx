import React, { useState } from "react";
import FolderTree from "./FolderTree";
import AddArticleModal from "./AddArticleModal";
import CreateFolderModal from "./CreateFolderModal";

const FolderList = () => {
  const [isAddArticleModalOpen, setIsAddArticleModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

  const handleAddArticle = () => {
    setIsAddArticleModalOpen(true);
  };

  const handleCreateFolder = () => {
    setIsCreateFolderModalOpen(true);
  };

  const handleCloseAddArticleModal = () => {
    setIsAddArticleModalOpen(false);
  };

  const handleCloseCreateFolderModal = () => {
    setIsCreateFolderModalOpen(false);
  };

  return (
    <div className="flex">
      <aside className="fixed pt-20 pb-20 px-8 w-96 overflow-y-auto border-r border-gray-200 h-full">
        <div className="py-2 border-b border-gray-200 mb-8">
          <button
            onClick={handleAddArticle}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            + Add Article
          </button>
          <button
            onClick={handleCreateFolder}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Create Folder
          </button>
        </div>
        <FolderTree />
      </aside>
      {isAddArticleModalOpen && <AddArticleModal handleCloseModal={handleCloseAddArticleModal} />}
      {isCreateFolderModalOpen && <CreateFolderModal handleCloseModal={handleCloseCreateFolderModal} />}
    </div>
  );
};

export default FolderList;
