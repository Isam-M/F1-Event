import { useContext, useState } from "react";
import { DriverContext } from "../../context/DriverContext";
import { IDriverContext } from "../../interfaces/IDriverContext";

const DriverListCompact = () => {
  const [showList, setShowList] = useState(false);
  const { drivers } = useContext(DriverContext) as IDriverContext;

  const getDriversTSX = () => {
    const driversTSX = drivers.map((_driver, i) => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center"
        key={i}
      >
        <span>ID: {_driver.id}</span>
        <span>{_driver.name}</span>
        <span>Age: {_driver.age}</span>
        <span>{_driver.nationality}</span>
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
      <p>Amount of drivers: {drivers.length}</p>
      {showList && (
        <div className="list-container">
          <ul className="list-group">{getDriversTSX()}</ul>
        </div>
      )}
    </section>
  );
};

export default DriverListCompact;
