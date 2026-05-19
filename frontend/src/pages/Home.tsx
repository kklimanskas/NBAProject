import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Pagination,
  Box,
  Skeleton,
  Alert,
  Stack,
} from "@mui/material";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import { fetchPlayers } from "../api/playerApi";
import type { PlayersResponse } from "../types/nba";

const PLAYERS_PER_PAGE = 5;

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PlayersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchPlayers(page, PLAYERS_PER_PAGE);
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load players"),
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadPlayers();
  }, [page]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center", mb: 4 }}
      >
        <SportsBasketballIcon sx={{ fontSize: 48, color: "primary.main" }} />
        <Box>
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
            NBA Players
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Browse and discover NBA players
          </Typography>
        </Box>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load players. Please try again later.
        </Alert>
      )}

      {isLoading && (
        <Grid container spacing={3}>
          {Array.from({ length: PLAYERS_PER_PAGE }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Skeleton
                variant="rectangular"
                height={280}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {!isLoading && data && (
        <>
          <Grid container spacing={3}>
            {data.data.map((player) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={player.id}>
                <PlayerCard player={player} />
              </Grid>
            ))}
          </Grid>

          {data.meta.total_pages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={data.meta.total_pages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 2 }}
          >
            Showing {(page - 1) * PLAYERS_PER_PAGE + 1} -{" "}
            {Math.min(page * PLAYERS_PER_PAGE, data.meta.total_count)} of{" "}
            {data.meta.total_count} players
          </Typography>
        </>
      )}
    </Container>
  );
};

export default Home;
