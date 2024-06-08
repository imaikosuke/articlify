import axios from "axios";
import React, { useState } from "react";

interface ModalProps {
  handleCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ handleCloseModal }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/summary?url=${url}`);
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      console.error(error);
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
        <h2 className="text-xl font-bold mb-4">Add Article</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          placeholder="Enter article URL"
        />
        <button
          onClick={() => handleSubmit()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Modal;
