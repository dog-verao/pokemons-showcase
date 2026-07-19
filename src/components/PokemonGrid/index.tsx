import React, { useState } from "react";
import { Container, Grid, Stack } from "@mui/material";
import { Typography } from "../Typography";
import type { PokemonGridProps } from "./PokemonGrid.types";
import { Filter } from "@/components";
import { INITIAL_FILTER_STATE } from "../Filter/Filter.types";
import type { FilterState } from "../Filter/Filter.types";
import { useGetAllPokemons } from "../../hooks/useGetAllPokemons";
import { Loading } from "../Loading";
import PokemonCard from "../PokemonCard";

const PAGE_SIZE = 20;

export const PokemonGrid: React.FC<PokemonGridProps> = ({ headline }) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [page, setPage] = useState(0);

  const { pokemons, isLoading, isError, error, total } = useGetAllPokemons(
    filters,
    { page, pageSize: PAGE_SIZE },
  );
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleFiltersChange = (next: FilterState) => {
    setFilters(next);
    setPage(0);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {headline && (
          <Grid size={12}>
            <Stack
              sx={{
                padding: 2,
                position: "sticky",
                top: 0,
                backgroundColor: "background.paper",
                zIndex: 1,
              }}
            >
              <Typography component="h1">{headline}</Typography>
            </Stack>
          </Grid>
        )}
        <Grid size={headline ? 8 : 12}>
          {isLoading && <Loading label="Loading pokemons" size={200} />}
          {isError && (
            <Typography role="alert" color="error">
              {error?.message ?? "Something went wrong loading pokemons."}
            </Typography>
          )}
          {!isLoading && !isError && (
            <Grid container spacing={2}>
              {pokemons.map((pokemon) => (
                <Grid key={pokemon.id} size={3}>
                  <PokemonCard
                    pokemon={pokemon}
                    href={`/pokemon/${pokemon.name}`}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid size={headline ? 4 : 12}>
          <Filter
            onChange={handleFiltersChange}
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
