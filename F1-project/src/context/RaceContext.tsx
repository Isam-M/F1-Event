import { FC, ReactNode, useState, createContext, useEffect } from "react";
import { IRace } from "../interfaces/IRace";
import { IRaceContext } from "../interfaces/IRaceContext";
import RaceService from "../services/RaceService";

export const RaceContext = createContext<IRaceContext | null>(null);

interface Props {
  children: ReactNode;
}

export const RaceProvider: FC<Props> = ({ children }) => {
  const [races, setRaces] = useState<IRace[]>([]);

  useEffect(() => {
    setTimeout(() => {
      getRaceFromService();
    }, 2000);
  }, []);

  const getRaceFromService = async () => {
    const raceFromService = await RaceService.getAll();
    setRaces(raceFromService);
  };

  const getById = async (id: number) => {
    const raceFromService = await RaceService.getById(id);
    return raceFromService;
  };

  const editRace = async (race: IRace) => {
    await RaceService.editTable(race as IRace);
    getRaceFromService();
  };

  const deleteRace = async (id: number) => {
    const result = await RaceService.deleteById(id);
    getRaceFromService();
    return result;
  };

  const getByName: (name: string) => Promise<IRace[]> = async (name) => {
    const result = await RaceService.getByName(`get/${name}`);
    getRaceFromService();
    return result as IRace[];
  };

  const addRace = async (newRace: IRace) => {
    await RaceService.postWithoutImage(newRace);
    getRaceFromService();
  };

  return (
    <RaceContext.Provider
      value={{ races, addRace, getById, editRace, deleteRace, getByName }}
    >
      {children}
    </RaceContext.Provider>
  );
};
