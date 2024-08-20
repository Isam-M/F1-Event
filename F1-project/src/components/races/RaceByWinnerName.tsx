import { FC, useState, useContext } from "react";
import { RaceContext } from "../../context/RaceContext";
import { IRaceContext } from "../../interfaces/IRaceContext";
import { IRace } from "../../interfaces/IRace";
import RaceList from "./RaceList";

const RaceByWinnerName: FC = () => {
  const { getByName, races } = useContext(RaceContext) as IRaceContext;
  const [name, setName] = useState<string>("");
  const [filteredRaces, setFilteredRaces] = useState<IRace[]>(races);
  const [status, setStatus] = useState<string>("Enter driver name");

  const handleSearch = async () => {
    if (name.trim() === "") {
      setStatus("Enter a name");
      setFilteredRaces(races);
    } else {
      const result = await getByName(name);

      if (Array.isArray(result)) {
        setFilteredRaces(result);
        setStatus("Races Won by " + name + ": " + result.length);
      } else {
        setStatus("Driver not found");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-dark" onClick={handleSearch}>
              Search
            </button>
          </div>
          <p className="text-center">{status}</p>
        </div>
      </div>
      <RaceList filteredRaces={filteredRaces} />
    </div>
  );
};

export default RaceByWinnerName;
