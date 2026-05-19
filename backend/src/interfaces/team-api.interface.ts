export interface TeamModel {
  apiId: number;
  name: string;
  full_name: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
}

export interface FetchTeamResponse<T> {
  data: T[];
}