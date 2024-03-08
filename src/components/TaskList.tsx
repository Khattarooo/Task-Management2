import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../redux/slices/taskSlice";
import { Toaster, toast } from "sonner";

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
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`${ApiUrl}?id=${taskId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(deleteTask({ id: taskId }));
        toast.error("Task Deleted successfully");
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handlePatchTask = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`${ApiUrl}?id=${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: taskId,
          completed: !completed, 
        }),
      });
      if (response.ok) {
        dispatch(toggleTaskCompletion({ id: taskId }));
        toast.success("Task Completed successfully");
      } else {
        console.error("Failed to patch task");
      }
    } catch (error) {
      console.error("Error patching task:", error);
    }
  };

  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {pendingTasks.length === 0 ? (
        <p className="text-center">No tasks available</p>
      ) : (
        pendingTasks.map((task) => (
          <div
            key={task.id}
            className="bg-yellow-200 rounded-tr-3xl rounded-bl-3xl p-4 m-2 rounded shadow-lg transform rotate-1 hover:rotate-0 transition duration-300 ease-in-out"
          >
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <p className="mb-4">{task.completed ? "Completed" : "Pending"}</p>
            <button
              onClick={() => handlePatchTask(task.id, task.completed)}
              className={`py-2 px-4 mr-2 text-sm ${
                task.completed
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded shadow`}
            >
              {task.completed ? "Mark Pending" : "Mark Completed"}
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="py-2 px-4 text-sm bg-red-500 hover:bg-red-600 text-white rounded shadow"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
