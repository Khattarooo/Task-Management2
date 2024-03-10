import React from "react";

interface Props {
  confirmDeleteTask: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteTaskConfirmation: React.FC<Props> = ({
  confirmDeleteTask,
  onCancel,
  onConfirm,
}) => {
  if (!confirmDeleteTask) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-800 opacity-50"
        onClick={onCancel}
      ></div>
      <div className="absolute bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4 text-center">
          Are you sure you want to Delete this task?
        </p>
        <div className="flex justify-center">
          <button
            onClick={onCancel}
            className="mr-4 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
          >
            Delete 
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskConfirmation;
