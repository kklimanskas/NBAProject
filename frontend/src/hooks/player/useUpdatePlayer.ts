import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePlayer } from '../../api/playerApi';
import type { Player, UpdatePlayerPayload } from '../../types/nba';

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePlayerPayload }) => {
      const data: UpdatePlayerPayload = {
        ...payload,
        team:
          payload.team 
      };

      return updatePlayer(id, data);
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
};
