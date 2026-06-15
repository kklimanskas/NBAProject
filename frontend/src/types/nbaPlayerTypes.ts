import { Position, Conference, Division } from "../enums/index.enum";
import type { Team } from "./nbaTeamTypes";

export interface Player {
  apiId: number;
  firstName: string;
  lastName: string;
  position: Position;
  height: string;
  weight: string;
  jerseyNumber: string;
  college: string;
  country: string;
  draftYear: number;
  draftRound: number;
  draftNumber: number;
  team: Team;
}

export interface PlayersResponse {
  data: Player[];
  meta: {
    total_pages: number;
    current_page: number;
    per_page: number;
    total_count: number;
  };
}

export interface PlayerResponse {
  data: Player;
}

export interface UpdatePlayerPayload {
  firstName?: string;
  lastName?: string;
  college?: string;
  country?: string;
  jerseyNumber?: string;
  weight?: string;
  height?: string;
  position?: string;
  draftYear?: number;
  draftRound?: number;
  draftNumber?: number;
  team?: number;
}
