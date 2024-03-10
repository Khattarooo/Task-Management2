import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faSpinner,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import useTasks from "@/hooks/useTasks";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface CompletedTaskListProps {
  tasks: Task[];
}

const CompletedTaskList: React.FC<CompletedTaskListProps> = ({ tasks }) => {
  const { handleDeleteTask, handleTogglePending, uncheckedTasks } = useTasks();

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
      {completedTasks.length === 0 ? (
        <div className="col-span-full h-40 align-middle bg-white rounded-tr-3xl rounded-bl-3xl p-4 m-2 shadow-lg flex justify-center items-center text-center transform rotate-1 hover:rotate-0 transition duration-300 ease-in-out w-full sm:w-3/4 md:w-2/4 mx-auto">
          <p>No Completed Tasks Available</p>
        </div>
      ) : (
        completedTasks.map((task) => (
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
              Status:{" "}
              {uncheckedTasks.includes(task.id) ? "Pending" : "Completed"}
              {uncheckedTasks.includes(task.id) ? (
                <FontAwesomeIcon
                  className="ml-2 hover:rotate-180 "
                  icon={faSpinner}
                />
              ) : (
                <FontAwesomeIcon
                  className="ml-2 hover:rotate-12 "
                  icon={faCheckCircle}
                />
              )}
            </p>
            <div className="flex justify-between items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!uncheckedTasks.includes(task.id)}
                  onChange={() => handleTogglePending(task)}
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2"> Mark as Pending</span>
              </label>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="py-2 px-4 text-sm bg-red-500 hover:bg-red-600 text-white rounded shadow"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedTaskList;
