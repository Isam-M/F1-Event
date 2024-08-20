import { useContext } from "react";
import { CustomDriverContext } from "../../context/CustomDriverContext";
import { ICustomDriverContext } from "../../interfaces/ICustomDriverContext";
import { ICustomDriver } from "../../interfaces/ICustomDriver";

import CustomDriverService from "../../services/CustomDriverService";

const DisplayCustomDriver = () => {
  const { customDrivers } = useContext(
    CustomDriverContext
  ) as ICustomDriverContext;
  const customDriverId = customDrivers.length - 1;
  const customDriver: ICustomDriver = customDrivers[customDriverId];

  if (!customDriver) return null;

  return (
    <div
      className="border border-info rounded p-3 mx-auto d-block"
      style={{ maxWidth: "15rem" }}
    >
      <h5 className="text-center">{customDriver.name}</h5>
      <img
        src={`${CustomDriverService.getImageUrl()}/${customDriver.driverImage}`}
        alt={`${customDriver.name} .Photo`}
        style={{ maxWidth: "150px" }}
        className="mx-auto d-block rounded-pill"
      />
      <p className="text-center">{customDriver.age}</p>
      <p className="text-center">{customDriver.nationality}</p>
      <p className="text-center">{customDriver.carBrand}</p>
    </div>
  );
};

export default DisplayCustomDriver;
