import { useContext, useState } from "react";
import { ITeamContext } from "../../interfaces/ITeamcontext";
import { TeamContext } from "../../context/TeamContext";

const TeamListCompact = () => {
  const [showList, setShowList] = useState<boolean>(false);
  const { teams } = useContext(TeamContext) as ITeamContext;

  const getTeamsTSX = () => {
    const teamsTSX = teams.map((_team, i) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        key={i}
      >
        <span>ID: {_team.id}</span>
        <span>{_team.manufacturer}</span>
        <span>{_team.driver1}</span>
        <span>{_team.driver2}</span>
      </li>
    ));
    return teamsTSX;
  };

  const toggleShowList = () => {
    setShowList((prevState) => !prevState);
  };

  return (
    <section className="container">
      <h3 className="text-center">Teams</h3>
      <button className="btn btn-dark" onClick={toggleShowList}>
        {showList ? "Hide" : "Show"} teams
      </button>
      <p>Amount of teams: {teams.length}</p>
      {showList && <ul className="list-group">{getTeamsTSX()}</ul>}
    </section>
  );
};

export default TeamListCompact;
