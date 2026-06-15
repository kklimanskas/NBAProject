import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePlayer } from '../../api/playerApi';
import type { Player, UpdatePlayerPayload } from '../../types/nba';

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePlayer(id),
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
};