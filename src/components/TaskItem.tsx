import { useRouter } from "next/router";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}
interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const router = useRouter();

  const navigateToDetails = () => {
    router.push(`/taskDetails/${task.id}`);
  };

  return (
    <div onClick={navigateToDetails}>
      <h3>{task.title}</h3>
      <p>{task.completed ? "Completed" : "Pending"}</p>
    </div>
  );
};

export default TaskItem;
