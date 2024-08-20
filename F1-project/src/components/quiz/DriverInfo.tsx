import React, { useContext } from "react";
import { DriverContext } from "../../context/DriverContext";
import { IDriver } from "../../interfaces/IDriver";
import IDriverInfo from "../../interfaces/IDriverInfo";
import "../../styles/Quiz.css";
import DriverService from "../../services/DriverService";

const DriverInfo: React.FC<IDriverInfo> = ({ selectedDriverId }) => {
  const driverContext = useContext(DriverContext);
  let driver: IDriver | undefined;

  if (selectedDriverId !== null && driverContext) {
    driver = driverContext.drivers.find((d) => d.id === selectedDriverId);
  }

  if (!driver) {
    return <div>No driver selected or driver not found</div>;
  }

  return (
    <div className="driver-info-container text-center">
      <h3>{driver.name}</h3>
      <p>Age: {driver.age}</p>
      <p>Nationality: {driver.nationality}</p>
      {driver.image && (
        <img
          src={`${DriverService.getImageUrl()}/${driver.image}`}
          alt={`Image of ${driver.name}`}
          className="driver-info-image"
        />
      )}
    </div>
  );
};

export default DriverInfo;
