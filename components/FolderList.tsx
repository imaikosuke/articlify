import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import axios from "axios";

const FolderList = () => {
  const folder = useSelector((state: RootState) => state.folder.folderName);
  const dispatch = useDispatch();

  axios
    .post("/api/folder")
    .then((response: any) => {
      // Explicitly define the type of 'response' as 'any'
      console.log(response.data);
    })
    .catch((error: any) => {
      console.error(error);
    });

  return (
    <aside className="fixed pt-20 pb-20 lg:pb-0 lg:px-8 lg:w-96 lg:block overflow-y-auto border-r border-border block w-full left-0 h-full">
      <nav>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg hover:bg-gray-100"
              onClick={() =>
                dispatch({ type: "folder/setFolderName", payload: "Fold" })
              }
            >
              {folder}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg hover:bg-gray-100"
            >
              Folder 2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg hover:bg-gray-100"
            >
              Folder 3
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default FolderList;
