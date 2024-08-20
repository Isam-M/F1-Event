import { FC } from "react";
import { IDriver } from "../../interfaces/IDriver";
import DriverService from "../../services/DriverService";

import styles from "../../styles/DriverItem.module.css";

const DriverItem: FC<IDriver> = ({ name, age, nationality, image }) => {
  return (
    <article className={`border border-dark col-lg-3 col-md-4 col-6`}>
      <img
        src={`${DriverService.getImageUrl()}/${image}`}
        alt={`${name}'s photo`}
        className={styles.driverImage}
      />
      <div className={styles.cardBody}>
        <h5 className={`font-weight-bold text-center text-danger`}>{name}</h5>
        <p className={`text-center`}>{age} years old</p>
        <p className={` text-center`}>{nationality}</p>
      </div>
    </article>
  );
};

export default DriverItem;
