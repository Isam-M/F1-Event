import { useContext, useState } from "react";
import { CustomDriverContext } from "../../context/CustomDriverContext";
import { ICustomDriverContext } from "../../interfaces/ICustomDriverContext";

const CustomDriverListCompact = () => {
  const [showList, setShowList] = useState(false);
  const { customDrivers } = useContext(
    CustomDriverContext
  ) as ICustomDriverContext;

  const getDriversTSX = () => {
    const driversTSX = customDrivers.map((_driver, id) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        key={id}
      >
        <span>ID: {_driver.id}</span>
        <span>{_driver.name}</span>
        <span>Age: {_driver.age}</span>
        <span>{_driver.nationality}</span>
        <span>{_driver.carBrand}</span>
      </li>
    ));
    return driversTSX;
  };

  const toggleShowList = () => {
    setShowList((prevState) => !prevState);
  };

  return (
    <section className="container">
      <h3 className="text-center">List of Drivers</h3>
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-dark" onClick={toggleShowList}>
          {showList ? "Hide List" : "Show List"}
        </button>
      </div>
      <p>Amount of drivers: {customDrivers.length}</p>
      {showList && (
        <div className="list-container">
          <ul className="list-group">{getDriversTSX()}</ul>
        </div>
      )}
    </section>
  );
};

export default CustomDriverListCompact;
