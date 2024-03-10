// pages/taskDetails.tsx
import Navbar from "@/components/Navbar";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";

type TaskDetails = {
  title: string;
  image: string;
};

interface TaskDetailsPageProps {
  taskDetails: TaskDetails | null;
}

export const getServerSideProps: GetServerSideProps<
  TaskDetailsPageProps
> = async () => {
  try {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    if (!apiURL) {
      throw new Error("API URL is not defined in the environment variables");
    }

    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Failed to fetch task details");
    }
    const json = await response.json();
    const taskDetails: TaskDetails = {
      title: json.data.result.title,
      image: json.data.result.image,
    };

    return {
      props: {
        taskDetails,
      },
    };
  } catch (error) {
    console.error("Error fetching task details:", error);
    return {
      props: {
        taskDetails: null,
      },
    };
  }
};

const TaskDetailsPage: NextPage<TaskDetailsPageProps> = ({ taskDetails }) => {
  useEffect(() => {
    document.title = "Details - Task Management";
  }, [taskDetails]);

  return (
    <div className="min-h-screen min-w-[380px] bg-gray-200">
      <Navbar />
      <div className="pt-0.5">
        <div className="flex justify-center mt-20">
          <div className="w-11/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {taskDetails ? (
                <div className="col-span-full sm:col-span-2 md:col-span-3 lg:col-span-4">
                  <div className="bg-white rounded-tr-3xl rounded-bl-3xl p-4 m-2 shadow-lg flex justify-center items-center text-center transform rotate-1 hover:rotate-0 transition duration-300 ease-in-out">
                    <div>
                      <h1>{taskDetails.title}</h1>
                      <Image
                        src={taskDetails.image}
                        alt={`Image for ${taskDetails.title}`}
                        width={200}
                        height={200}
                        unoptimized={true}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-span-full sm:col-span-2 md:col-span-3 lg:col-span-4">
                  <div className="h-40 bg-white rounded-tr-3xl rounded-bl-3xl p-4 m-2 shadow-lg flex justify-center items-center text-center transform rotate-1 hover:rotate-0 transition duration-300 ease-in-out">
                    <p>No Task Details Available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskDetailsPage;
