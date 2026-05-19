import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import { Position } from "../../enums/index.enum";
import type { Player } from "../../types/nba";

interface PlayerCardProps {
  player: Player;
}

const getPositionColor = (position: Position) => {
  switch (position) {
    case Position.G:
      return "primary";
    case Position.F:
      return "success";
    case Position.C:
      return "error";
    case Position.G_F:
      return "warning";
    case Position.F_C:
      return "secondary";
    default:
      return "default";
  }
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "primary.main",
              fontSize: 24,
            }}
          >
            {player.firstName}
            {player.lastName}
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", lineHeight: 1.2 }}
            >
              {player.firstName} {player.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {player.team ? player.team.full_name : "No Team"}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {player.position && (
            <Chip
              label={player.position}
              size="small"
              color={getPositionColor(player.position) as any}
            />
          )}
          {player.jersey_number && (
            <Chip
              label={`#${player.jersey_number}`}
              size="small"
              variant="outlined"
            />
          )}
        </Stack>

        <Stack spacing={0.5}>
          {player.height && (
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Height
              </Typography>
              <Typography variant="body2">{player.height}</Typography>
            </Stack>
          )}
          {player.weight && (
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Weight
              </Typography>
              <Typography variant="body2">{player.weight} lbs</Typography>
            </Stack>
          )}
          {player.country && (
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Country
              </Typography>
              <Typography variant="body2">{player.country}</Typography>
            </Stack>
          )}
          {player.college && (
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                College
              </Typography>
              <Typography variant="body2" noWrap>
                {player.college}
              </Typography>
            </Stack>
          )}
          {player.draftYear && (
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Draft
              </Typography>
              <Typography variant="body2">
                {player.draftYear} R{player.draftRound} #{player.draftNumber}
              </Typography>
            </Stack>
          )}
          {player.team && (
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Conference
              </Typography>
              <Typography variant="body2">{player.team.conference}</Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
