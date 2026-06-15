import { useQuery } from '@tanstack/react-query';
import { fetchPlayers } from '../api/playerApi';

interface UsePlayersParams {
  page: number;
  perPage: number;
  search?: string;
  position?: string;
  country?: string;
}

export const usePlayers = ({ page, perPage, search, position, country }: UsePlayersParams) => {
  return useQuery({
    queryKey: ['players', { page, perPage, search, position, country }],
    queryFn: () => fetchPlayers(page, perPage, search, position, country),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};