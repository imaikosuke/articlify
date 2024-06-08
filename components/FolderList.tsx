import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import axios from "axios";
import Modal from "./AddArticleModal";

const FolderList = () => {
  const folder = useSelector((state: RootState) => state.folder.folderName);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  axios
    .post("/api/folder")
    .then((response: any) => {
      // Explicitly define the type of 'response' as 'any'
      console.log(response.data);
    })
    .catch((error: any) => {
      console.error(error);
    });

  const handleAddArticle = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <aside className="fixed pt-20 pb-20 lg:pb-0 lg:px-8 lg:w-96 lg:block overflow-y-auto border-r border-border block w-full left-0 h-full">
        <div className="py-2 border-b border-gray-200">
          <button
            onClick={handleAddArticle}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Article
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => dispatch({ type: "folder/setFolderName", payload: "Fold" })}
              >
                {folder}
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 rounded-lg hover:bg-gray-100">
                Folder 2
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 rounded-lg hover:bg-gray-100">
                Folder 3
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      {isModalOpen && <Modal handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default FolderList;
