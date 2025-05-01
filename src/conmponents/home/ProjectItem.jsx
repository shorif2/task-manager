import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProject } from "../../features/filters/filterSlice";

const ProjectItem = ({ project }) => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  const handleChange = (project) => {
    setChecked(!checked);
    dispatch(filterProject(project));
  };

  return (
    <div key={project?.id} className="checkbox-container">
      <input
        type="checkbox"
        className={project?.colorClass}
        onChange={() => handleChange(project?.projectName)}
        checked={checked}
      />
      <p className="label">{project?.projectName}</p>
    </div>
  );
};

export default ProjectItem;
