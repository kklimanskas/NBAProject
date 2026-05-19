import { TeamModel } from "./team-api.interface";

export interface PlayerModel {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  jersey_number: string;
  college: string;
  country: string;
  draft_year: number;
  draft_round: number;
  draft_number: number;
  team?: { id: number };
}

export interface FetchPlayerResponse<T>{
  data:T[];
}