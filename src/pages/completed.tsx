import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteActiveTasks } from "../redux/slices/taskSlice";
import { Toaster, toast } from "sonner";
import DeleteConfirmation from "../features/deleteAll";
import Navbar from "@/components/Navbar";
import CompletedTaskList from "../components/CompletedTaskList";

const Completed = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const showCompletedTasks = useRef(true);
  const completedTasks = tasks.filter((task) => task.completed);

  useEffect(() => {
    document.title = "Completed Tasks - Task Management";
  }, [showCompletedTasks]);

  const handleDeleteAllTasks = () => {
    if (showCompletedTasks) {
      if (completedTasks.length > 0) {
        setConfirmDelete(true);
      } else {
        toast.info("No completed tasks to delete");
      }
    }
  };
  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const handleConfirmDelete = () => {
    if (showCompletedTasks) {
      completedTasks.forEach((task) => {
        dispatch(deleteActiveTasks(task.id));
      });
      toast.error("Completed tasks deleted successfully");
    }
    setConfirmDelete(false);
  };

  return (
    <div className="min-h-screen min-w-[380px] bg-gray-200">
      <Navbar />
      <div className="pt-0.5">
        <div className="flex justify-center mt-20">
          <div className="w-11/12">
            <form id="add" className="my-4 flex items-center">
              <input
                id="taskTitle"
                type="text"
                placeholder="Enter new task title"
                className="flex-auto min-w-[40px] shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled
              />
              <input
                id="count"
                type="text"
                value={` ${completedTasks.length} Completed`}
                readOnly
                className="text-md cursor-pointer min-w-[5px] shadow ml-3 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                disabled
                type="submit"
                style={{ backgroundColor: "rgb(147 51 234)" }}
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Add Task
              </button>
              {tasks.length > 0 && (
                <button
                  type="button"
                  style={{ backgroundColor: " rgb(239 68 68 )" }}
                  onClick={handleDeleteAllTasks}
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
                >
                  Delete All
                </button>
              )}
            </form>
            <CompletedTaskList tasks={completedTasks} />
            <Toaster richColors position="bottom-right" />
          </div>
        </div>
        <DeleteConfirmation
          confirmDelete={confirmDelete}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default Completed;
