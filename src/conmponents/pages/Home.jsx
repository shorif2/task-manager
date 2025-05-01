import React from "react";
import ProjectList from "../home/ProjectList";
import Team from "../home/Team";

import Tasks from "../home/Tasks";

const Home = () => {
  return (
    <div className="container relative">
      <div className="sidebar">
        {/*Projects List */}
        <ProjectList />
        {/* Team Members */}
        <Team />
      </div>
      {/* tasks */}
      <Tasks />
    </div>
  );
};

export default Home;
