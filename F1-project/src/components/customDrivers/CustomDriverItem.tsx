import { FC } from "react";
import { ICustomDriver } from "../../interfaces/ICustomDriver";
import CustomDriverService from "../../services/CustomDriverService";

import styles from "../../styles/DriverItem.module.css";

const CustomDriverItem: FC<ICustomDriver> = ({
  name,
  age,
  nationality,
  driverImage,
}) => {
  return (
    <div className={`border border-dark col-lg-3 col-md-4 col-6 m-0.50`}>
      <img
        src={`${CustomDriverService.getImageUrl()}/${driverImage}`}
        alt={`${name} .Photo`}
        className={styles.driverImage}
      />
      <div className={styles.cardBody}>
        <h5 className={`font-weight-bold text-center text-danger`}>{name}</h5>
        <p className={`text-center`}>{age} years old</p>
        <p className={` text-center`}>{nationality}</p>
      </div>
    </div>
  );
};

export default CustomDriverItem;
