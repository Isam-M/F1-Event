import { FC } from "react";
import { ITeam } from "../../interfaces/ITeam";
import TeamService from "../../services/TeamService";

const TeamItem: FC<ITeam> = ({ manufacturer, image, driver1, driver2 }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 card mb-3 shadow">
      <h5 className="font-weight-bold text-center">{manufacturer}</h5>
      <img
        src={`${TeamService.getImageUrl()}/${image}`}
        alt={`${manufacturer}'s photo`}
        className="card-img-top"
        style={{
          width: "20rem",
          margin: "10px auto",
          display: "block",
        }}
      />
      <div className="card-body text-center">
        <p className="card-text">Driver 1: {driver1}</p>
        <p className="card-text">Driver 2: {driver2}</p>
      </div>
    </div>
  );
};

export default TeamItem;
