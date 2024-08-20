import { ITeam } from "./ITeam";

export interface ITeamContext {
  teams: ITeam[];
  addTeam: (team: ITeam, image: File | null) => Promise<void>;
  getById: (id: number) => Promise<void>;
  editTeam: (team: ITeam) => Promise<void>;
  deleteTeam: (teamId: number) => Promise<ITeam | null>;
}
