import React, { useState } from "react";
import { CircularProgress, Container, Grid } from "@mui/material";
import { Typography } from "../Typography";
import type { PokemonGridProps } from "./PokemonGrid.types";
import { Filter } from "@/components";
import { INITIAL_FILTER_STATE } from "../Filter/Filter.types";
import type { FilterState } from "../Filter/Filter.types";
import { useGetAllPokemons } from "../../hooks/useGetAllPokemons";

const PAGE_SIZE = 20;

export const PokemonGrid: React.FC<PokemonGridProps> = ({ headline }) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [page] = useState(0);

  const { pokemons, isLoading, isError, error } = useGetAllPokemons(filters, {
    page,
    pageSize: PAGE_SIZE,
  });

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={headline ? 4 : 12}>
          <Filter onChange={setFilters} />
        </Grid>
        {headline && (
          <Grid size={8}>
            <Typography>{headline}</Typography>
          </Grid>
        )}
        <Grid size={12}>
          {isLoading && <CircularProgress aria-label="Loading pokemons" />}
          {isError && (
            <Typography color="error">
              {error?.message ?? "Something went wrong loading pokemons."}
            </Typography>
          )}
          {!isLoading && !isError && (
            <Grid container spacing={2}>
              {pokemons.map((pokemon) => (
                <Grid key={pokemon.id} size={3}>
                  <Typography>{pokemon.name}</Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
