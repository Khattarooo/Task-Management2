import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteTask, toggleTaskCompletion } from "../redux/slices/taskSlice";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const useTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);
  const [uncheckedTasks, setUncheckedTasks] = useState<string[]>([]);

  // Here is an example of a infinit loop the function continuously calls
  // itself without a termination condition, leading to an endless cycle
  // and it continue to display the toast message after each iteration.

  // const handleDeleteTask = (taskId: string) => {
  //   setTimeout(() => {
  //     handleDeleteTask(taskId);
  //   }, 300);
  //   toast.error("Task Deleted successfully");
  // };

  // To fix this bug since we are working with Redux store we use dispatch
  // to Trigger the deleteTask action and we pass to it the taskId and then
  // it will be removed from the Redux store and display a success message

  const handleDeleteTask = (taskId: string) => {
    const timeoutId = setTimeout(() => {
      dispatch(deleteTask(taskId));
      toast.error("Task Deleted successfully");
    }, 300);
    return () => clearTimeout(timeoutId);
  };

  // And here at the same time we are using the component lifecycle methods,
  // the return arrow function is used to clean up when a component unmounts

  const handleToggleTaskCompletion = (task: Task) => {
    const taskId = task.id;
    const updatedCheckedTasks = [taskId, ...checkedTasks];
    setCheckedTasks(updatedCheckedTasks);
    const timeoutId = setTimeout(() => {
      dispatch(toggleTaskCompletion(taskId));
      toast.success("Task Completed successfully");
    }, 200);

    return () => clearTimeout(timeoutId);
  };

  const handleTogglePending = (task: Task) => {
    const taskId = task.id;
    setUncheckedTasks([...uncheckedTasks, taskId]);
    const timeoutId = setTimeout(() => {
      dispatch(toggleTaskCompletion(taskId));
      toast.success("Task marked as pending successfully");
    }, 300);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.completed);
    const pendingTasks = tasks.filter((task) => !task.completed);
    setCompletedTasks(completedTasks);
    setPendingTasks(pendingTasks);
  }, [tasks]);

  return {
    completedTasks,
    pendingTasks,
    handleDeleteTask,
    handleToggleTaskCompletion,
    handleTogglePending,
    checkedTasks,
    uncheckedTasks,
    setPendingTasks,
  };
};

export default useTasks;
