import { useContext, useState } from "react";
import { IDriverContext } from "../../interfaces/IDriverContext";
import { DriverContext } from "../../context/DriverContext";
import DriverItem from "./DriverItem";
import SearchBar from "./SearchBar";

const DriverList = () => {
  const { drivers } = useContext(DriverContext) as IDriverContext;
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDriversTSX = () => {
    const driversTSX = filteredDrivers.map((driver, i) => (
      <DriverItem
        key={i}
        id={driver.id}
        name={driver.name}
        age={driver.age}
        nationality={driver.nationality}
        image={driver.image}
      />
    ));
    return driversTSX;
  };

  return (
    <section>
      <h3>Drivers</h3>
      <p>Amount of drivers: {filteredDrivers.length}</p>
      <section>
        <SearchBar onSearch={setSearchQuery} />
      </section>
      <section className="container">
        <div className="row">{getDriversTSX()}</div>
      </section>
    </section>
  );
};

export default DriverList;
