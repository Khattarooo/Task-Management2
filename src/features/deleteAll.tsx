import React from "react";

interface Props {
  confirmDelete: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<Props> = ({
  confirmDelete,
  onCancel,
  onConfirm,
}) => {
  if (!confirmDelete) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-800 opacity-50"
        onClick={onCancel}
      ></div>
      <div className="absolute bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4 text-center">
          Are you sure you want to delete all tasks?
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
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
