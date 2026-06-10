import axios from "axios";
import type { PlayersResponse, PlayerResponse } from "../types/nba";
import type { Player, UpdatePlayerPayload } from "../types/nba";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchPlayers = async (
  page: number,
  perPage: number,
  search?: string,
  position?: string,
  country?: string,
): Promise<PlayersResponse> => {
  const { data } = await api.get<PlayersResponse>("player/get", {
    params: { page, perPage, search, position, country },
  });
  return data;
};

export const fetchPlayer = async (id: number): Promise<PlayerResponse> => {
  const response = await api.get<PlayerResponse>(`/player/${id}`);
  return response.data;
};

export const updatePlayer = async (
  id: number,
  payload: UpdatePlayerPayload,
): Promise<Player> => {
  const response = await api.patch<Player>(`/player/update/${id}`, payload);
  return response.data;
};
