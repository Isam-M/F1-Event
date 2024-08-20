import { IDriver } from "./IDriver";

export interface IDriversGrid {
  drivers: IDriver[];
  onSelectDriver: (id: number) => void;
  isQuizActive: boolean;
}
