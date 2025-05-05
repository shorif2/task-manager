import React from "react";
import EditForm from "../updateTask/EditForm";
import { useSingleTaskQuery } from "../../features/tasks/tasksApi";
import { useParams } from "react-router-dom";
import { size } from "lodash";
import Error from "../ui/Error";

const UpdateTask = () => {
  const { id } = useParams();
  const { data: task, isLoading, isError, error } = useSingleTaskQuery(id);

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
  if (size(task)) {
    content = <EditForm task={task} />;
  }
  if (!size(task)) content = <p className="m-2 text-center">No tasks found!</p>;
  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </main>
    </div>
  );
};

export default UpdateTask;
