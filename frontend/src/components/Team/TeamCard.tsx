import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import type { Team } from '../../types/nbaTeamTypes';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" component="div" gutterBottom>
        {team.fullName}
      </Typography>
      <Typography color="text.secondary">
        {team.city} · {team.abbreviation}
      </Typography>
      <Stack sx={{ direction: "row", spacing: 1, mt: 2 }}>
        <Chip label={team.conference} size="small" />
        <Chip label={team.division} size="small" />
      </Stack>
    </CardContent>
  </Card>
);

export default TeamCard;