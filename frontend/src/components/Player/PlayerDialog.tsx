import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { Player } from "../../types/nbaPlayerTypes";
import { Position } from "../../enums/index.enum";

interface PlayerEditDialogProps {
  open: boolean;
  player: Player;
  onClose: () => void;
  onSave: (updatedPlayer: Player) => void;
}

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

type PlayerEditForm = {
  firstName: string;
  lastName: string;
  college: string;
  country: string;
  jerseyNumber: string;
  weight: string;
  height: string;
  position: Position;
  draftYear: string;
  draftRound: string;
  draftNumber: string;
};

const getPositionLabel = (position: Position) => {
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
    case Position.F_G:
      return "Forward-Guard";
    case Position.C_F:
      return "Center-Forward";
    default:
      return position;
  }
};

const toEditForm = (player: Player): PlayerEditForm => ({
  firstName: player.firstName,
  lastName: player.lastName,
  college: player.college,
  country: player.country,
  jerseyNumber: player.jerseyNumber,
  weight: player.weight,
  height: player.height,
  position: player.position,
  draftYear: String(player.draftYear),
  draftRound: String(player.draftRound),
  draftNumber: String(player.draftNumber),
});

const parseNumber = (value: string, fallback = 0) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const PlayerEditDialog: React.FC<PlayerEditDialogProps> = ({
  open,
  player,
  onClose,
  onSave,
}) => {
  const [formValues, setFormValues] = useState<PlayerEditForm>(toEditForm(player));

  useEffect(() => {
    if (open) {
      setFormValues(toEditForm(player));
    }
  }, [open, player]);

  const handleChange = (field: keyof PlayerEditForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<Position>) => {
    setFormValues((prev) => ({ ...prev, position: event.target.value as Position }));
  };

  const handleSave = () => {
    onSave({
      ...player,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      college: formValues.college,
      country: formValues.country,
      jerseyNumber: formValues.jerseyNumber,
      weight: formValues.weight,
      height: formValues.height,
      position: formValues.position as Position,
      draftYear: parseNumber(formValues.draftYear, player.draftYear),
      draftRound: parseNumber(formValues.draftRound, player.draftRound),
      draftNumber: parseNumber(formValues.draftNumber, player.draftNumber),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Player</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              label="First Name"
              fullWidth
              value={formValues.firstName}
              onChange={handleChange("firstName")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              label="Last Name"
              fullWidth
              value={formValues.lastName}
              onChange={handleChange("lastName")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              label="College"
              fullWidth
              value={formValues.college}
              onChange={handleChange("college")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              label="Country"
              fullWidth
              value={formValues.country}
              onChange={handleChange("country")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              label="Jersey Number"
              fullWidth
              value={formValues.jerseyNumber}
              onChange={handleChange("jerseyNumber")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="player-position-label">Position</InputLabel>
              <Select
                labelId="player-position-label"
                id="player-position"
                value={formValues.position}
                label="Position"
                onChange={handleSelectChange}
              >
                {Object.values(Position).map((value) => (
                  <MenuItem key={value} value={value}>
                    {getPositionLabel(value)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              label="Height"
              fullWidth
              value={formValues.height}
              onChange={handleChange("height")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <TextField
              label="Weight"
              fullWidth
              value={formValues.weight}
              onChange={handleChange("weight")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 4 }}>
            <TextField
              label="Draft Year"
              fullWidth
              value={formValues.draftYear}
              onChange={handleChange("draftYear")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 4 }}>
            <TextField
              label="Draft Round"
              fullWidth
              value={formValues.draftRound}
              onChange={handleChange("draftRound")}
            />
          </Grid>
          <Grid sx={{ xs: 12, sm: 4 }}>
            <TextField
              label="Draft Pick"
              fullWidth
              value={formValues.draftNumber}
              onChange={handleChange("draftNumber")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>No</Button>
      <Button color="error" variant="contained" onClick={onConfirm}>
        Yes, delete
      </Button>
    </DialogActions>
  </Dialog>
);
