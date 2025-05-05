import React, { useState } from "react";
import { useGetTeamQuery } from "../../features/team/teamApi";
import { size } from "lodash";
import { useGetProjectQuery } from "../../features/projects/projectApi";
import { useAddTaskMutation } from "../../features/tasks/tasksApi";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
  const [taskInfo, setTaskInfo] = useState({});
  const { data: team } = useGetTeamQuery();
  const { data: projects } = useGetProjectQuery();
  const [addTask, { isLoading }] = useAddTaskMutation();
  const navigate = useNavigate();

  const setInfo = (input, data) => {
    return setTaskInfo((prev) => ({ ...prev, [input]: data }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(taskInfo)
      .unwrap()
      .then((res) => {
        if (size(res)) {
          setTaskInfo({});
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                required
                placeholder="Implement RTK Query"
                value={taskInfo?.taskName || ""}
                onChange={(e) => setInfo("taskName", e.target.value)}
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                name="teamMember"
                id="lws-teamMember"
                required
                onChange={(e) => {
                  const member = team?.find(
                    (member) => member?.id === parseInt(e.target.value)
                  );
                  if (size(member)) {
                    setInfo("teamMember", member);
                  }
                }}
              >
                <option value="" hidden>
                  Select Job
                </option>
                {team?.map((member) => (
                  <option key={member?.id} value={member?.id}>
                    {member?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="projectName"
                required
                onChange={(e) => {
                  const project = projects?.find(
                    (project) => project?.id === parseInt(e.target.value)
                  );
                  if (size(project)) {
                    setInfo("project", project);
                  }
                }}
              >
                <option value="" hidden>
                  Select Project
                </option>
                {projects?.map((project) => (
                  <option key={project?.id} value={project?.id}>
                    {project?.projectName}
                  </option>
                ))}
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-deadline"
                required
                value={taskInfo?.deadline || ""}
                onChange={(e) => setInfo("deadline", e.target.value)}
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit" disabled={isLoading}>
                {isLoading ? "Saving" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddTask;
