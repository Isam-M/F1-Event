import { useContext, useState } from "react";
import { RaceContext } from "../../context/RaceContext";
import { IRaceContext } from "../../interfaces/IRaceContext";

const RaceListCompact = () => {
  const [showList, setShowList] = useState(false);
  const { races } = useContext(RaceContext) as IRaceContext;

  const getRacesTSX = () => {
    const racesTSX = races.map((_race, i) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        key={i}
      >
        <span>ID: {_race.id}</span>
        <span>GP: {_race.grandPrix}</span>
        <span>Winner: {_race.winnerName}</span>
        <span>Time: {_race.winnerTime}</span>
        <span>Laps: {_race.numberOfLaps}</span>
      </li>
    ));
    return racesTSX;
  };

  const toggleShowList = () => {
    setShowList((prevState) => !prevState);
  };

  return (
    <section className="container">
      <h3 className="text-center">List of Races</h3>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-dark" onClick={toggleShowList}>
          {showList ? "Hide List" : "Show List"}
        </button>
      </div>
      <p>Amount of races: {races.length}</p>
      {showList && <ul className="list-group">{getRacesTSX()}</ul>}
    </section>
  );
};

export default RaceListCompact;
