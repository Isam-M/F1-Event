import { IDriver } from "./IDriver";

export interface IQuiz {
  selectedDriverId: number | null;
  onCorrectAnswer: () => void;
  drivers: IDriver[];
  setDrivers: React.Dispatch<React.SetStateAction<IDriver[]>>;
  setQuizActive: (active: boolean) => void;
}
