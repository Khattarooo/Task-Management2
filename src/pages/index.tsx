import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setTasks, addTask as addTaskToRedux } from "../redux/slices/taskSlice";
import TaskList from "../components/TaskList";
import { Toaster, toast } from "sonner";
import Link from "next/link";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchTasks();
  }, [dispatch]);

  const fetchTasks = async () => {
    const response = await fetch(`${ApiUrl}`);
    const data = await response.json();
    dispatch(setTasks(data));
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${ApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTaskTitle,
        completed: false,
      }),
    });
    setNewTaskTitle("");
    fetchTasks();
    toast.info("Task Created successfully");
  };

  return (
    <div>
      <nav className="top-0 left-0 right-0 bg-gradient-to-r from-purple-400 to-pink-600 text-white py-3 px-5 flex items-center justify-between z-50 mt-4 mx-4 rounded-full shadow-lg">
        <div className="font-bold text-xl">LOGO</div>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-200">
            About
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 bg-white text-purple-600 rounded-full hover:bg-gray-200"
          >
            Contact
          </Link>
        </div>
      </nav>

      <div className=" pt-0.5">
        <div className="flex justify-center">
          <div className=" w-11/12">
            <h1 className="xl:text-2xl sm:text-md md:text-xl text-xl font-bold text-gray-800 mb-6">
              Active Tasks
            </h1>
            <form id="add" onSubmit={handleAddTask} className="my-4">
              <input
                id="taskTitle"
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter new task title"
                required
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Add Task
              </button>
            </form>
            {tasks.length > 0 ? (
              <TaskList tasks={tasks} />
            ) : (
              <p className="text-sm text-gray-500">No tasks available</p>
            )}
            <Toaster richColors position="bottom-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
