export interface PlayerResponse {
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
  team: {
    id: number;
    name: string;
    full_name: string;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
  };
}