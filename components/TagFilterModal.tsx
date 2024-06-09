import React from "react";

interface TagFilterModalProps {
  tags: string[];
  onClose: () => void;
  onSelectTag: (tag: string) => void;
}

const TagFilterModal: React.FC<TagFilterModalProps> = ({ tags, onClose, onSelectTag }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg relative w-2/3 max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-gray-900"
        >
          &#x2715;
        </button>
        <h2 className="text-xl font-bold mb-4">Select a Tag</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              onSelectTag("");
              onClose();
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            All Tags
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                onSelectTag(tag);
                onClose();
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagFilterModal;
