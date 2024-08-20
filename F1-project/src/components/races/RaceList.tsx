import { FC } from "react";
import RaceItem from "./RaceItem";
import { IRace } from "../../interfaces/IRace";

interface RaceListProps {
  filteredRaces: IRace[];
}

const RaceList: FC<RaceListProps> = ({ filteredRaces }) => {
  const getRacesTSX = () => {
    const racesTSX = filteredRaces.map((_race, i) => (
      <RaceItem
        key={i}
        id={_race.id}
        grandPrix={_race.grandPrix}
        numberOfLaps={_race.numberOfLaps}
        winnerName={_race.winnerName}
        winnerTime={_race.winnerTime}
      />
    ));
    return racesTSX;
  };

  return (
    <section className="container">
      <div className="row">{getRacesTSX()}</div>
    </section>
  );
};

export default RaceList;
