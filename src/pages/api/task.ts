import type { NextApiRequest, NextApiResponse } from "next";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Tasks extends Array<Task> {}

let tasks: Tasks = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(tasks);
      break;
    case "POST":
      const newTask: Task = req.body;
      newTask.id = Date.now().toString();
      tasks.push(newTask);
      res.status(201).json(newTask);
      break;
    case "DELETE":
      const taskIdToDelete = req.query.id as string;
      const deleteIndex = tasks.findIndex((task) => task.id === taskIdToDelete);
      if (deleteIndex !== -1) {
        tasks.splice(deleteIndex, 1);
        res.status(200).json({
          message: `Task with id ${taskIdToDelete} deleted successfully`,
        });
      } else {
        res.status(404).json({
          message: `Task with id ${taskIdToDelete} not found`,
        });
      }
      break;
    case "PATCH":
      const { id, completed } = req.body;
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        res.status(200).json({
          message: `Task with id ${id} status updated successfully`,
        });
      } else {
        res.status(404).json({
          message: `Task with id ${id} not found`,
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
