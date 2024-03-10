import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSpinner,
  faCheckCircle,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import useTasks from "@/hooks/useTasks";
import router from "next/router";
import { toast } from "sonner";
import DeleteTaskConfirmation from "@/features/deleteTask";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { handleDeleteTask, handleToggleTaskCompletion, checkedTasks } =
    useTasks();
  const pendingTasks = tasks.filter((task) => !task.completed);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState("");

  const handleDeleteTaskConfirmation = (taskId: string) => {
    setConfirmDeleteTask(true);
    setDeleteTaskId(taskId);
  };

  const handleTaskDetails = () => {
    router.push("/taskdetails");
    toast.loading("Loading Task Details");
  };

  const handleCancelDelete = () => {
    setConfirmDeleteTask(false);
    setDeleteTaskId("");
  };

  const handleConfirmDelete = () => {
    handleDeleteTask(deleteTaskId);
    setConfirmDeleteTask(false);
    setDeleteTaskId("");
  };

  return (
    <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
      {pendingTasks.length === 0 ? (
        <div className=" col-span-full h-40 align-middle bg-white rounded-tr-3xl rounded-bl-3xl p-4 m-2 shadow-lg flex justify-center items-center text-center transform rotate-1 hover:rotate-0 transition duration-300 ease-in-out w-full sm:w-3/4 md:w-2/4 mx-auto">
          <p>No Tasks Available</p>
        </div>
      ) : (
        pendingTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-tr-3xl rounded-bl-3xl p-4 m-2 shadow-lg transform rotate-1 hover:rotate-0 transition duration-300 ease-in-out flex flex-col justify-between"
          >
            <h3
              className={`text-lg mb-2 ${
                task.title.length > 10 ? "whitespace-pre-wrap" : ""
              }`}
            >
              <span className="font-semi">Task Title:</span> {task.title}
            </h3>
            <p className=" mt-2 cursor-pointer">
              Status: {checkedTasks.includes(task.id) ? "Completed" : "Pending"}
              {checkedTasks.includes(task.id) ? (
                <FontAwesomeIcon
                  className="ml-2 hover:rotate-12 "
                  icon={faCheckCircle}
                />
              ) : (
                <FontAwesomeIcon
                  className="ml-2 hover:rotate-180 "
                  icon={faSpinner}
                />
              )}
            </p>
            <div className="flex justify-between items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  id={task.id}
                  type="checkbox"
                  checked={checkedTasks.includes(task.id)}
                  onChange={() => handleToggleTaskCompletion(task)}
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2 mr-6"> Mark as Complete</span>
              </label>

              <button
                onClick={handleTaskDetails}
                className="py-2 px-4 mr-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
              >
                <FontAwesomeIcon icon={faInfo} />
              </button>
              <button
                onClick={() => handleDeleteTaskConfirmation(task.id)}
                className="py-2 px-4 ml-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded shadow"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))
      )}
      <DeleteTaskConfirmation
        confirmDeleteTask={confirmDeleteTask}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default TaskList;
