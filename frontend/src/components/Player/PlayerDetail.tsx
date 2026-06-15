import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  Skeleton,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import { fetchPlayer, updatePlayer } from "../../api/playerApi";
import type { Player } from "../../types/nbaPlayerTypes";
import { Position } from "../../enums/index.enum";
import { PlayerEditDialog, ConfirmDialog } from "./PlayerDialog";
import type { UpdatePlayerPayload } from "../../types/nbaPlayerTypes";
import { deletePlayer } from "../../api/playerApi";
import { useUpdatePlayer } from "../../hooks/player/useUpdatePlayer";
import { useDeletePlayer } from "../../hooks/player/useDeletePlayer";
import { usePlayer } from "../../hooks/player/useGetPlayer";

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

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  //const [player, setPlayer] = useState<Player | null>(null);
  const { data, isLoading, error } = usePlayer(Number(id));

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const { mutate: update, isPending: isUpdating } = useUpdatePlayer();
  const { mutate: remove, isPending: isDeleting } = useDeletePlayer();

  // useEffect(() => {
  //   if (data?.data) {
  //     setPlayer(data.data);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   const loadPlayer = async () => {
  //     if (!id) return;

  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetchPlayer(Number(id));
  //       setPlayer(response.data);
  //     } catch (err) {
  //       setError(
  //         err instanceof Error ? err : new Error("Failed to load player"),
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadPlayer();
  // }, [id]);

  const handleOpenEdit = () => {
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  const handleOpenDeleteConfirm = () => {
    setIsDeleteConfirmOpen(true);
    setDeleted(false);
  };

  const handleCloseDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  };

  const handleSaveEdit = (updatedPlayer: Player) => {
    if (!data?.data) return;

    const payload: UpdatePlayerPayload = {
      firstName: updatedPlayer.firstName,
      lastName: updatedPlayer.lastName,
      college: updatedPlayer.college,
      country: updatedPlayer.country,
      jerseyNumber: String(updatedPlayer.jerseyNumber),
      weight: updatedPlayer.weight,
      height: updatedPlayer.height,
      position: updatedPlayer.position,
      draftYear: updatedPlayer.draftYear,
      draftRound: updatedPlayer.draftRound,
      draftNumber: updatedPlayer.draftNumber,
      team: updatedPlayer.team?.id,
    };

    update(
      { id: data.data.apiId, payload: payload },
      {
        onSuccess: () => {
          setIsEditOpen(false);
        },
        onError: () => {
          alert("Failed to update player. Please try again.");
        },
      },
    );
  };

  const handleConfirmDelete = async () => {
    if (!data?.data) return;
    remove(data.data.apiId, {
      onSuccess: (data) => {
        setDeleted(true);
        setDeleteMessage(data.message);
        setIsDeleteConfirmOpen(false);
        setTimeout(() => navigate("/"), 1000);
      },
      onError: () => {
        setIsDeleteConfirmOpen(false);
        setDeleted(true);
        setDeleteMessage("An error occurred while deleting the player.");
      },
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} />
      </Container>
    );
  }

  if (error || !data?.data) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 2 }}
        >
          Back to Players
        </Button>
        <Alert severity="error">Player not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        Back to Players
      </Button>

      {deleted && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {`${deleteMessage}`}
        </Alert>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" onClick={handleOpenEdit}>
          Edit Player
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleOpenDeleteConfirm}
        >
          Soft Delete
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ overflow: "hidden" }}>
        {/* Header */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${getPositionColor(data.data.position)}33 0%, ${getPositionColor(data.data.position)}66 100%)`,
            p: 4,
          }}
        >
          <Grid container sx={{ spacing: 3, alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  backgroundColor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 4,
                  mx: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontVariant: "h1",
                    fontWeight: "bold",
                    color: "primary",
                  }}
                >
                  #{data.data.jerseyNumber}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                sx={{
                  fontVariant: "h1",
                  fontWeight: "bold",
                  color: "primary",
                  variant: "h3",
                  component: "h1",
                }}
                gutterBottom
              >
                {data.data.firstName} {data.data.lastName}
              </Typography>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  spacing: 1,
                  flexWrap: "wrap",
                }}
                useFlexGap
              >
                <Chip
                  icon={<SportsBasketballIcon />}
                  label={getPositionFullName(data.data.position)}
                  sx={{
                    backgroundColor: getPositionColor(data.data.position),
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    py: 2,
                    mr: 0.5,
                  }}
                />
                <Chip
                  label={data.data.team.abbreviation}
                  variant="outlined"
                  sx={{ fontWeight: "bold", fontSize: "1rem", py: 2 }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4 }}>
          {/* Team Info */}
          <Typography sx={{ variant: "h5", fontWeight: "bold" }} gutterBottom>
            Team Information
          </Typography>
          <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Team
                </Typography>
                <Typography variant="h6">{data.data.team.fullName}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Conference
                </Typography>
                <Typography variant="h6">{data.data.team.conference}</Typography>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Division
                </Typography>
                <Typography variant="h6">{data.data.team.division}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Divider sx={{ my: 3 }} />

          {/* Physical Stats */}
          <Typography sx={{ variant: "h5", fontWeight: "bold" }} gutterBottom>
            Physical Stats
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Height
                </Typography>
                <Typography sx={{ variant: "h5", fontWeight: "bold" }}>
                  {data.data.height}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Weight
                </Typography>
                <Typography sx={{ variant: "h5", fontWeight: "bold" }}>
                  {data.data.weight} lbs
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Position
                </Typography>
                <Typography sx={{ variant: "h5", fontWeight: "bold" }}>
                  {data.data.position}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Jersey
                </Typography>
                <Typography sx={{ variant: "h5", fontWeight: "bold" }}>
                  #{data.data.jerseyNumber}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Background */}
          <Typography sx={{ variant: "h5", fontWeight: "bold" }} gutterBottom>
            Background
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack
                sx={{ direction: "row", spacing: 2, alignItems: "center" }}
              >
                <SchoolIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    College
                  </Typography>
                  <Typography variant="body1">
                    {data.data.college || "N/A"}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack
                sx={{ direction: "row", spacing: 2, alignItems: "center" }}
              >
                <PublicIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Country
                  </Typography>
                  <Typography variant="body1">{data.data.country}</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Draft Info */}
          <Typography sx={{ variant: "h5", fontWeight: "bold" }} gutterBottom>
            Draft Information
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 4 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "action.hover",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Year
                </Typography>
                <Typography sx={{ variant: "h5", fontWeight: "bold" }}>
                  {data.data.draftYear || "Undrafted"}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "action.hover",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Round
                </Typography>
                <Typography sx={{ variant: "h5", fontWeight: "bold" }}>
                  {data.data.draftRound || "Undrafted"}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "action.hover",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Pick
                </Typography>
                <Typography sx={{ variant: "h5", fontWeight: "bold" }}>
                  {data.data.draftNumber || "Undrafted"}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <PlayerEditDialog
        open={isEditOpen}
        player={data.data}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />

      <ConfirmDialog
        open={isDeleteConfirmOpen}
        title="Confirm Soft Delete"
        message="Do you really want to do that? This will soft delete the player."
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default PlayerDetail;
