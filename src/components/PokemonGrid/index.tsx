import React from "react";
import { Container, Grid } from "@mui/material";
import { Typography } from "../Typography";
import type { PokemonGridProps } from "./PokemonGrid.types";

export const PokemonGrid: React.FC<PokemonGridProps> = ({ headline }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        {headline && (
          <Grid size={12}>
            <Typography>{headline}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
