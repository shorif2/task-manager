import { useState } from "react";
import { useGetProjectQuery } from "../../features/projects/projectApi";
import { useGetTeamQuery } from "../../features/team/teamApi";
import { size } from "lodash";
import { useUpdateTaskMutation } from "../../features/tasks/tasksApi";
import { useNavigate } from "react-router-dom";

const EditForm = ({ task }) => {
  const { data: team } = useGetTeamQuery();
  const { data: projects } = useGetProjectQuery();
  const [taskInfo, setTaskInfo] = useState(task);
  const [updateTask, { data, isLoading, isSuccess }] = useUpdateTaskMutation();
  const navigate = useNavigate();
  const setInfo = (input, data) => {
    return setTaskInfo((prev) => ({ ...prev, [input]: data }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask({ id: task?.id, data: taskInfo })
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  return (
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
            <option
              key={member?.id}
              value={member?.id}
              selected={member?.id === task?.teamMember?.id}
            >
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
        <button type="submit" className="lws-submit" disabled={false}>
          Update
        </button>
      </div>
    </form>
  );
};

export default EditForm;
