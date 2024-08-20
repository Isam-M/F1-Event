import { FC, ReactNode, useState, createContext, useEffect } from "react";
import { ICustomDriver } from "../interfaces/ICustomDriver";
import { ICustomDriverContext } from "../interfaces/ICustomDriverContext";
import CustomDriverService from "../services/CustomDriverService";

export const CustomDriverContext = createContext<ICustomDriverContext | null>(
  null
);

interface Props {
  children: ReactNode;
}

export const CustomDriverProvider: FC<Props> = ({ children }) => {
  const [customDrivers, setCustomDrivers] = useState<ICustomDriver[]>([]);

  useEffect(() => {
    setTimeout(() => {
      getCustomDriverFromService();
    }, 2000);
  }, []);

  const getCustomDriverFromService = async () => {
    try {
      const customDriverFromService = await CustomDriverService.getAll();
      setCustomDrivers(customDriverFromService);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getById = async (id: number) => {
    const customDriverFromService = await CustomDriverService.getById(id);
    if (
      customDriverFromService !== undefined &&
      customDriverFromService !== null
    ) {
      getCustomDriverFromService();
      return customDriverFromService;
    } else {
      return undefined;
    }
  };

  const editCustomDriver = async (customDriver: ICustomDriver) => {
    await CustomDriverService.editTable(customDriver as ICustomDriver);
    getCustomDriverFromService();
  };

  const deleteCustomDriver = async (id: number) => {
    const result = await CustomDriverService.deleteById(id);
    getCustomDriverFromService();
    return result;
  };

  const addCustomDriver = async (newCustomDriver: any, image: File | null) => {
    await CustomDriverService.post(newCustomDriver, image);
    getCustomDriverFromService();
  };

  return (
    <CustomDriverContext.Provider
      value={{
        customDrivers,
        addCustomDriver,
        getById,
        editCustomDriver,
        deleteCustomDriver,
      }}
    >
      {children}
    </CustomDriverContext.Provider>
  );
};
