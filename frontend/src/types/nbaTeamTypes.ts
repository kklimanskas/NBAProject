import { Conference, Division } from "../enums/index.enum";

interface Team {
  id: number;
  conference: Conference;
  division: Division;
  city: string;
  name: string;
  fullName: string;
  abbreviation: string;
}

export type { Team }