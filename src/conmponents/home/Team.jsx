import { useGetTeamQuery } from "../../features/team/teamApi";

const Team = () => {
  const { data: team } = useGetTeamQuery();

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      {team?.map((team) => (
        <div key={team.id} className="mt-3 space-y-4">
          <div className="checkbox-container">
            <img src="./images/avatars/sumit.png" className="team-avater" />
            <p className="label">{team?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Team;
