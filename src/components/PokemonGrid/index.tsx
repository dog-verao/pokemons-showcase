import React from "react";
import { Container, Grid } from "@mui/material";
import { Typography } from "../Typography";
import type { PokemonGridProps } from "./PokemonGrid.types";
import { Filter } from "@/components";

export const PokemonGrid: React.FC<PokemonGridProps> = ({ headline }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={headline ? 4 : 12}>
          <Filter />
        </Grid>
        {headline && (
          <Grid size={8}>
            <Typography>{headline}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
