import { Conference, Division } from '../enums/index.enum'; 

export interface TeamModel {
  apiId: number;
  name: string;
  full_name: string;
  abbreviation: string;
  city: string;
  conference: Conference;
  division: Division;
}

export interface FetchTeamResponse<T> {
  data: T[];
}