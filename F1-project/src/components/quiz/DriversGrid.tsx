import React, { useContext } from "react";
import { DriverContext } from "../../context/DriverContext";
import { TeamContext } from "../../context/TeamContext";
import { IDriver } from "../../interfaces/IDriver";
import { IDriversGrid } from "../../interfaces/IDriversGrid";
import { ITeam } from "../../interfaces/ITeam";
import "../../styles/Quiz.css";
import DriverService from "../../services/DriverService";
import TeamService from "../../services/TeamService";

const DriversGrid: React.FC<IDriversGrid> = ({
  drivers,
  onSelectDriver,
  isQuizActive,
}) => {
  const driverContext = useContext(DriverContext);
  const teamContext = useContext(TeamContext);

  if (!driverContext || !teamContext) {
    return <div>Loading drivers and teams...</div>;
  }

  const { teams } = teamContext;

  const displayedDrivers =
    drivers.length > 12 ? [...drivers.slice(0, 13)] : drivers;

  return (
    <>
      <div className="road-container">
        <section className="finish-line"></section>
        <div className="grid-container">
          {displayedDrivers.map((driver: IDriver, index) => {
            const team: ITeam | undefined = teams.find(
              (t) => t.driver1 === driver.name || t.driver2 === driver.name
            );
            const carImage = team
              ? `${TeamService.getImageUrl()}/${team.image}`
              : "";

            return (
              <div
                key={driver.id}
                className="driver-container"
                onClick={() => !isQuizActive && onSelectDriver(driver.id || 0)}
                style={{ order: index }}
              >
                <div className="driver">
                  <div className="img-container">
                    <img
                      src={carImage}
                      alt={`Car of ${driver.name}`}
                      className="car-image"
                    />
                    {driver.image && (
                      <img
                        src={`${DriverService.getImageUrl()}/${driver.image}`}
                        alt={`Image of ${driver.name}`}
                        className="driver-image"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DriversGrid;
