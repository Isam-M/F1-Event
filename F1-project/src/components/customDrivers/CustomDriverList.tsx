import { useContext } from "react";
import { ICustomDriverContext } from "../../interfaces/ICustomDriverContext";
import { CustomDriverContext } from "../../context/CustomDriverContext";
import CustomDriverItem from "./CustomDriverItem";

const CustomDriverList = () => {
  const { customDrivers } = useContext(
    CustomDriverContext
  ) as ICustomDriverContext;

  const getCustomDriversTSX = () => {
    const customDriversTSX = customDrivers.map((customDriver, i) => (
      <CustomDriverItem key={customDriver.id} {...customDriver} />
    ));
    return customDriversTSX;
  };
  return (
    <section>
      <h3 className="mt-5">Amateur Drivers</h3>
      <p>Amount of drivers: {customDrivers.length}</p>
      <section className="container">
        <div className="row">{getCustomDriversTSX()}</div>
      </section>
    </section>
  );
};

export default CustomDriverList;
