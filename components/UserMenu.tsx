import React, { useState } from "react";
import Cookies from "js-cookie";
import SignOutButton from "../ui/SignOutButton";
import { auth } from "../lib/firebase/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";

const UserMenu = () => {
  const [user, loading] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  const handleCopyUserId = () => {
    const userId = Cookies.get("user");
    if (userId) {
      navigator.clipboard.writeText(userId);
      alert("User ID copied to clipboard");
    }
  };

  const handleAvatarClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) return null;

  return (
    <div>
      <div className="fixed bottom-4 left-4">
        <div className="cursor-pointer" onClick={handleAvatarClick}>
          {user && user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User Avatar"
              className="w-15 h-15 rounded-full"
              width={60}
              height={60}
            />
          ) : (
            <Image
              src="/user.svg"
              alt="User Avatar"
              className="w-15 h-15 rounded-full"
              width={60}
              height={60}
            />
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-gray-900"
            >
              &#x2715;
            </button>
            <h2 className="text-xl font-bold mb-4">User Info</h2>
            {user && user.email && <p className="text-sm text-gray-700 font-bold mb-2">Email: {user.email}</p>}
            <div className="text-sm text-gray-700 mb-4">
              <div className="flex items-center">
                <p className="font-bold mr-2">User ID: {Cookies.get("user")}</p>
                <button
                  onClick={handleCopyUserId}
                  className="text-gray-700 hover:text-gray-900"
                  aria-label="Copy User ID"
                >
                  <FaCopy />
                </button>
              </div>
              <p>（Chrome拡張機能を使用するにはUser IDが必要です）</p>
            </div>
            <SignOutButton onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
