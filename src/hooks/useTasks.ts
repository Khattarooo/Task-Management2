import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  deleteTask,
  toggleTaskCompletion,
  addTask,
  deleteActiveTasks,
} from "../redux/slices/taskSlice";
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
  const [newTaskTitle, setNewTaskTitle] = useState("");

  //const [confirmDelete, setConfirmDelete] = useState(false);
  const setConfirmDelete = useRef;

  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);
  const [uncheckedTasks, setUncheckedTasks] = useState<string[]>([]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "") {
      toast.error("Task title cannot be empty");
      return;
    }
    dispatch(
      addTask({
        id: Math.random().toString(),
        title: newTaskTitle,
        completed: false,
      })
    );
    setNewTaskTitle("");
    toast.info("Task Created successfully");
  };

  const handleDeleteAllTasks = () => {
    if (completedTasks.length > 0) {
      setConfirmDelete(true);
    } else {
      toast.info("No completed tasks to delete");
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const handleConfirmDelete = () => {
    completedTasks.forEach((task) => {
      dispatch(deleteActiveTasks(task.id));
    });
    toast.error("Completed tasks deleted successfully");
    setConfirmDelete(false);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
    toast.error("Task Deleted successfully");
  };

  const handleToggleTaskCompletion = (task: Task) => {
    const taskId = task.id;
    const updatedCheckedTasks = [taskId, ...checkedTasks];
    setCheckedTasks(updatedCheckedTasks);
    setTimeout(() => {
      dispatch(toggleTaskCompletion(taskId));
      toast.success("Task Completed successfully");
    }, 200);
  };

  const handleTogglePending = (task: Task) => {
    const taskId = task.id;
    setUncheckedTasks([...uncheckedTasks, taskId]);
    setTimeout(() => {
      dispatch(toggleTaskCompletion(taskId));
      toast.success("Task marked as pending successfully");
    }, 300);
  };

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.completed);
    const pendingTasks = tasks.filter((task) => !task.completed);
    setCompletedTasks(completedTasks);
    setPendingTasks(pendingTasks);
  }, [tasks]);

  return {
    handleAddTask,
    handleDeleteAllTasks,
    handleCancelDelete,
    handleConfirmDelete,
    completedTasks,
    pendingTasks,
    handleDeleteTask,
    handleToggleTaskCompletion,
    handleTogglePending,
    checkedTasks,
    uncheckedTasks,
  };
};

export default useTasks;
