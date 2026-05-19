import axios from 'axios';
import type { PlayersResponse } from '../types/nba';

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
  const { data } = await api.get<PlayersResponse>('player/get', {
    params: { page, perPage, search, position, country },
  });
  return data;
};