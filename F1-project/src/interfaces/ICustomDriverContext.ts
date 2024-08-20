import { ICustomDriver } from "./ICustomDriver";

export interface ICustomDriverContext {
  customDrivers: ICustomDriver[];
  addCustomDriver: (
    newCustomDriver: ICustomDriver,
    image: File | null
  ) => Promise<void>;
  getById: (id: number) => Promise<ICustomDriver> | null;
  editCustomDriver: (driver: ICustomDriver) => Promise<void>;
  deleteCustomDriver: (id: number) => Promise<void>;
}
