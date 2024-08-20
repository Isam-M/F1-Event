import { useContext } from "react";
import { ITeamContext } from "../../interfaces/ITeamcontext";
import { TeamContext } from "../../context/TeamContext";
import TeamItem from "./TeamItem";

const TeamList = () => {
  const { teams } = useContext(TeamContext) as ITeamContext;

  const getTeamsTSX = () => {
    const teamsTSX = teams.map((team, i) => (
      <TeamItem
        key={i}
        id={team.id}
        manufacturer={team.manufacturer}
        image={team.image}
        driver1={team.driver1}
        driver2={team.driver2}
      />
    ));
    return teamsTSX;
  };

  return (
    <section className="container">
      <div className="row">{getTeamsTSX()}</div>
    </section>
  );
};

export default TeamList;
