import React, { useState } from "react";
import { useGetProjectQuery } from "../../features/projects/projectApi";
import { size } from "lodash";
import LoadingSpinner from "../ui/Loading";
import ProjectItem from "./ProjectItem";
import { useSelector } from "react-redux";

const ProjectList = () => {
  const { data: projects, isLoading, error, isError } = useGetProjectQuery();
  const { projects: pro } = useSelector((state) => state.filter);
  // console.log(pro);

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
  if (size(projects)) {
    content = projects.map((project) => (
      <ProjectItem key={project.id} project={project} />
    ));
  }
  if (!isLoading && !isError && projects.length === 0)
    content = <p className="m-2 text-center">No projects found!</p>;
  return (
    <div>
      <h3 className="text-xl font-bold">Projectss</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};

export default ProjectList;
