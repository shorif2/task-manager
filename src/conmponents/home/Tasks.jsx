import React from "react";
import TaskHeader from "./TaskHeader";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import { size } from "lodash";

const Tasks = () => {
  // const {} = useSelector((state)=> {})
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  let content = null;
  if (isLoading) content = <p className="m-2 text-center">Loading...</p>;
  if (isError) {
    content = (
      <>
        {" "}
        <p className="m-2 text-center">
          <Error message={error} />
        </p>
      </>
    );
  }
  if (size(tasks)) {
    content = tasks.map((task) => <TaskList key={task.id} task={task} />);
  }
  if (!isLoading && !isError && tasks.length === 0)
    content = <p className="m-2 text-center">No tasks found!</p>;
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <TaskHeader />
        <div className="lws-task-list">{content}</div>
      </main>
    </div>
  );
};

export default Tasks;
