import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import FolderTree from "./FolderTree";
import AddArticleModal from "./AddArticleModal";
import CreateFolderModal from "./CreateFolderModal";

const FolderList = () => {
  const folder = useSelector((state: RootState) => state.folder.folderId);
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
    <div>
      <aside className="fixed pt-20 pb-20 lg:pb-0 lg:px-8 lg:w-96 lg:block overflow-y-auto border-r border-border block w-full left-0 h-full">
        <div className="py-2 border-b border-gray-200">
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

//   axios
//     .post("/api/folder")
//     .then((response: any) => {
//       // Explicitly define the type of 'response' as 'any'
//       console.log(response.data);
//     })
//     .catch((error: any) => {
//       console.error(error);
//     });
