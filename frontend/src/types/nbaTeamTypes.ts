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
