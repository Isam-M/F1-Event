import { FC } from "react";
import { IRace } from "../../interfaces/IRace";

const RaceItem: FC<IRace> = ({
  winnerName,
  winnerTime,
  grandPrix,
  numberOfLaps,
}) => {
  return (
    <div className="col-6 col-md-4 col-lg-3 card mb-3 shadow">
      <div className="card-body">
        <h5 className="card-title">{grandPrix} GP</h5>
        <p className="card-text">{numberOfLaps} Laps</p>
        <p className="card-text">Winner: {winnerName}</p>
        <p className="card-text">Time: {winnerTime}</p>
      </div>
    </div>
  );
};

export default RaceItem;
