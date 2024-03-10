import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface NavbarProps {
  onShowTaskList: () => void;
  onShowCompletedTasks: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onShowTaskList,
  onShowCompletedTasks,
}) => {
  const router = useRouter();

  const handleActiveClick = () => {
    onShowTaskList();
    router.push("/");
  };

  const handleCompletedClick = () => {
    onShowCompletedTasks();
    router.push("/");
  };

  return (
    <nav className="top-0 left-0 mt-4 fixed right-0 bg-gradient-to-r to-purple-600 from-pink-600 text-white py-3 px-5 flex items-center justify-between z-50 mx-4 rounded-full shadow-lg shadow-gray-400">
      <div className="font-semibold text-sm sm:text-xl md:text-2xl lg:text-3xl">
        <FontAwesomeIcon className="text-sm sm:text-xl md:text-2xl lg:text-3xl" icon={faListCheck} /> Task
        Management
      </div>
      <div className="space-x-4">
        <button
          onClick={handleActiveClick}
          className="px-1 py-1 text-white rounded-full hover:border-white hover:border-2"
        >
          Active
        </button>
        <button
          onClick={handleCompletedClick}
          className="px-1 py-1 text-white rounded-full hover:border-white hover:border-2"
        >
          Completed
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
