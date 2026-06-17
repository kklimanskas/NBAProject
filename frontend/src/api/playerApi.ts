import axios from "axios";
import type { PlayersResponse, PlayerResponse } from "../types/nbaPlayerTypes";
import type { Player, UpdatePlayerPayload } from "../types/nbaPlayerTypes";
import { API_ROUTES } from './apiRoutes';
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
  const { data } = await api.get<PlayersResponse>(API_ROUTES.PLAYERS.SELF, {
    params: { page, perPage, search, position, country },
  });
  return data;
};

export const fetchPlayer = async (id: number): Promise<PlayerResponse> => {
  const response = await api.get<PlayerResponse>(API_ROUTES.PLAYERS.BY_ID(id));
  return response.data;
};

export const updatePlayer = async (
  id: number,
  payload: UpdatePlayerPayload,
): Promise<Player> => {
  const response = await api.patch<Player>(API_ROUTES.PLAYERS.BY_ID(id), payload);
  return response.data;
};

export const deletePlayer = async (id: number): Promise<{ message: string }> => {
  const response = await api.patch<{ message: string }>(API_ROUTES.PLAYERS.BY_ID(id));
  return response.data;
};