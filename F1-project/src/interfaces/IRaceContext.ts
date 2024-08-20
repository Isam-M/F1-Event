import { IRace } from "./IRace";

export interface IRaceContext {
  races: IRace[];
  addRace: (newRace: IRace) => Promise<void>;
  getById: (id: number) => Promise<IRace> | null;
  editRace: (race: IRace) => Promise<void>;
  deleteRace: (id: number) => Promise<void>;
  getByName: (name: string) => Promise<IRace[]> | null;
}
