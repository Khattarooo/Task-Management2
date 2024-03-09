import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../redux/slices/taskSlice";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const dispatch = useDispatch();
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);

  const handleDeleteTask = (taskId: string) => {
    if (typeof taskId !== "string") {
      console.error("Task ID must be a string");
      return;
    }
    dispatch(deleteTask(taskId));
    toast.error("Task Deleted successfully");
  };

  const handleToggleTaskCompletion = (task: Task) => {
    const taskId = task.id;
    setCheckedTasks([...checkedTasks, taskId]);
    setTimeout(() => {
      dispatch(toggleTaskCompletion(taskId));
      toast.success("Task Completed successfully");
    }, 200);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pendingTasks.length === 0 ? (
        <div className=" col-span-full h-40 align-middle bg-white rounded-tr-3xl rounded-bl-3xl p-4 m-2 shadow-lg flex justify-center items-center text-center transform rotate-1 hover:rotate-0 transition duration-300 ease-in-out w-full sm:w-3/4 md:w-2/4 mx-auto">
          <p>No tasks available</p>
        </div>
      ) : (
        pendingTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-tr-3xl  rounded-bl-3xl p-4 m-2 shadow-lg transform rotate-1 hover:rotate-0 transition duration-300 ease-in-out flex flex-col justify-between"
          >
            <h3
              className={`text-lg font-semibold mb-2 ${
                task.title.length > 10 ? "whitespace-pre-wrap" : ""
              }`}
            >
              Task Title: {task.title}
            </h3>
            <p className="mb-4">
              Status: {task.completed ? "Completed" : "Pending"}
            </p>
            <div className="flex justify-between items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedTasks.includes(task.id)}
                  onChange={() => handleToggleTaskCompletion(task)}
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span className="ml-2"> Mark as Complete</span>
              </label>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="py-2 px-4 text-sm bg-red-500 hover:bg-red-600 text-white rounded shadow"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
