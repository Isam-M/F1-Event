import { FC, ReactNode, useState, createContext, useEffect } from "react";
import { ITeam } from "../interfaces/ITeam";
import { ITeamContext } from "../interfaces/ITeamcontext";
import TeamService from "../services/TeamService";

export const TeamContext = createContext<ITeamContext | null>(null);

interface Props {
  children: ReactNode;
}

export const TeamProvider: FC<Props> = ({ children }) => {
  const [teams, setTeams] = useState<ITeam[]>([]);

  useEffect(() => {
    setTimeout(() => {
      getTeamFromService();
    }, 2000);
  }, []);

  const getTeamFromService = async () => {
    const teamFromService = await TeamService.getAll();
    setTeams(teamFromService);
  };

  const getById = async (id: number) => {
    const teamFromService = await TeamService.getById(id);
    getTeamFromService();
    return teamFromService;
  };

  const editTeam = async (team: ITeam) => {
    await TeamService.editTable(team as ITeam);
    getTeamFromService();
  };

  const deleteTeam = async (id: number) => {
    const result = await TeamService.deleteById(id);
    getTeamFromService();
    return result;
  };

  const addTeam = async (newTeam: ITeam, image: File | null) => {
    await TeamService.post(newTeam, image);
    getTeamFromService();
  };

  return (
    <TeamContext.Provider
      value={{ teams, addTeam, getById, editTeam, deleteTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
};
