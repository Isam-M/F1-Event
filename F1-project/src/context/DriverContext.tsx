import { FC, ReactNode, useState, createContext, useEffect } from "react";
import { IDriver } from "../interfaces/IDriver";
import { IDriverContext } from "../interfaces/IDriverContext";
import DriverService from "../services/DriverService";

export const DriverContext = createContext<IDriverContext | null>(null);

interface Props {
  children: ReactNode;
}

export const DriverProvider: FC<Props> = ({ children }) => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);

  useEffect(() => {
    setTimeout(() => {
      getDriverFromService();
    }, 2000);
  }, []);

  const getDriverFromService = async () => {
    const driverFromService = await DriverService.getAll();
    setDrivers(driverFromService);
  };

  const getById = async (id: number) => {
    const driverFromService = await DriverService.getById(id);
    if (driverFromService !== undefined && driverFromService !== null) {
      getDriverFromService();
      return driverFromService;
    } else {
      console.log("Driver not found, invalid id");
      return undefined;
    }
  };

  const editDriver = async (editedDriver: IDriver) => {
    await DriverService.editTable(editedDriver);
    setDrivers((prevDrivers) => {
      const updatedDrivers = prevDrivers.map((driver) => {
        return driver.id === editedDriver.id ? editedDriver : driver;
      });
      getDriverFromService();
      return updatedDrivers;
    });
  };

  const deleteDriver = async (id: number) => {
    const result = await DriverService.deleteById(id);
    if (result) {
      setDrivers((prevDrivers) =>
        prevDrivers.filter((driver) => driver.id !== id)
      );
    }
    getDriverFromService();
    return result;
  };

  const addDriver = async (newDriver: any, image: File | null) => {
    await DriverService.post(newDriver, image);
    getDriverFromService();
  };

  return (
    <DriverContext.Provider
      value={{ drivers, addDriver, getById, editDriver, deleteDriver }}
    >
      {children}
    </DriverContext.Provider>
  );
};
