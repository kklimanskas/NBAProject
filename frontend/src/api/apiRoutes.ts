export const API_ROUTES = {
  PLAYERS: {
    SELF: '/player/get',
    BY_ID: (playerId: number) => `/player/${playerId}`,
  },
  TEAMS: {
    SELF: '/teams',
    BY_ID: (teamId: number) => `/teams/${teamId}`,
  },
};