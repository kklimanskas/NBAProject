import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Player } from "../../types/nba"
import { Position } from "../../enums/index.enum";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

interface PlayerCardProps {
  player: Player;
}

const getPositionColor = (position: string) => {
  switch (position) {
    case "G":
      return "#4CAF50";
    case "F":
      return "#2196F3";
    case "C":
      return "#FF9800";
    default:
      return "#9E9E9E";
  }
};

const getPositionFullName = (position: string) => {
  switch (position) {
    case Position.G:
      return "Guard";
    case Position.F: 
      return "Forward";
    case Position.C:
      return "Center";
    case Position.G_F:
      return "Guard-Forward";
    case Position.F_C:
      return "Forward-Center";
    default:
      return position;
  }
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const navigate = useNavigate();

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
      <CardActionArea onClick={() => navigate(`/player/${player.apiId}`)} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${getPositionColor(player.position)}22 0%, ${getPositionColor(player.position)}44 100%)`,
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "background.paper",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
            }}
          >
            <Typography sx={{ variant: "h3", fontWeight: "bold", color: "primary" }}>
              #{player.jersey_number}
            </Typography>
          </Box>
          <Chip
            label={player.team?.abbreviation}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              fontWeight: "bold",
            }}
          />
        </Box>

        <CardContent>
          <Typography gutterBottom sx={{ variant: "h5", component: "h2", fontWeight: "bold" }}>
            {player.firstName} {player.lastName}
          </Typography>

          <Stack sx={{ direction: "row", spacing: 1, mb: 2 }}>
            <Chip
              icon={<SportsBasketballIcon sx={{ fontSize: 16 }} />}
              label={getPositionFullName(player.position)}
              size="small"
              sx={{
                backgroundColor: getPositionColor(player.position),
                color: "white",
                fontWeight: 500,
              }}
            />
          </Stack>

          <Typography gutterBottom sx={{ variant: "body2", color: "text.secondary" }}>
            {player.team?.full_name}
          </Typography>

          <Stack sx={{ direction: "row", spacing: 2, mt: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Height
              </Typography>
              <Typography sx={{ variant: "body2", fontWeight: "medium" }}>
                {player.height}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Weight
              </Typography>
              <Typography sx={{ variant: "body2", fontWeight: "medium" }}>
                {player.weight} lbs
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Country
              </Typography>
              <Typography sx={{ variant: "body2", fontWeight: "medium" }}>
                {player.country}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlayerCard;