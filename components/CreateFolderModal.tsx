import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

interface ModalProps {
  handleCloseModal: () => void;
}

const CreateFolderModal: React.FC<ModalProps> = ({ handleCloseModal }) => {
  const [folderName, setFolderName] = useState("");
  const userId = Cookies.get("user");
  const opened_folder = useSelector((state: RootState) => state.folder.folderId);

  const handleSubmit = async () => {
    if (!folderName) return;

    const folderId = uuidv4();

    try {
      await axios.post("/api/create-folder", {
        id: folderId,
        name: folderName,
        uid: userId,
        parent_folder_id: opened_folder || "",
      });
      setFolderName("");
      handleCloseModal();
      // フォルダリストの更新処理をここに追加
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-11/12 max-w-3xl">
        <div className="flex justify-end">
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Create Folder</h2>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          placeholder="Enter folder name"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateFolderModal;
