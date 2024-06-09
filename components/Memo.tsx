import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/FirebaseConfig";
import axios from "axios";

const Memo: React.FC<{ articleId: string }> = ({ articleId }) => {
  const [memo, setMemo] = useState("");

  useEffect(() => {
    axios.get("/api/get_memo?article_id=" + articleId).then((res) => {
      console.log(res.data.memo);
      setMemo(res.data.memo || "");
    });
  }, []);

  const handleChange = (e: any) => {
    setMemo(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/save_memo", {
        articleId,
        memo,
      });
      alert("Memo saved successfully");
    } catch (error) {
      alert("Failed to save memo");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={memo}
          onChange={handleChange}
          placeholder="Enter your memo here..."
          rows={4}
          cols={50}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          メモを保存
        </button>
      </form>
    </div>
  );
};

export default Memo;
