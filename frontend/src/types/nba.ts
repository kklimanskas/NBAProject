import { Position, Conference, Division } from "../enums/index.enum";

export interface Team {
  id: number;
  conference: Conference;
  division: Division;
  city: string;
  name: string;
  fullName: string;
  abbreviation: string;
}

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