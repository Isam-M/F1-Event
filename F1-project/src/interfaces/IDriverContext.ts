import { IDriver } from "./IDriver";

export interface IDriverContext {
  drivers: IDriver[];
  getById: (id: number) => Promise<void>;
  editDriver: (driver: IDriver) => Promise<void>;
  deleteDriver: (driverId: number) => Promise<IDriver | null>;
  addDriver: (newDriver: IDriver, image: File | null) => Promise<void>;
}
