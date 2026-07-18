import React, { useState } from "react";
import { Typography } from "../Typography";
import { Stack } from "@mui/material";
import { Autocomplete } from "../Autocomplete";
import {
  INITIAL_FILTER_STATE,
  POKEMON_GENERATIONS,
  POKEMON_TYPES,
} from "./Filter.types";
import type { FilterComponentProps, FilterState } from "./Filter.types";

const Filter: React.FC<FilterComponentProps> = ({ onChange }) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);

  const updateFilters = (patch: Partial<FilterState>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    onChange?.(next);
  };

  return (
    <Stack spacing={2}>
      <Typography>Filters</Typography>
      <Autocomplete
        label="Type"
        options={[...POKEMON_TYPES]}
        value={filters.type}
        onChange={(value) => updateFilters({ type: value })}
      />
      <Autocomplete
        label="Generation"
        options={[...POKEMON_GENERATIONS]}
        value={filters.generation}
        onChange={(value) => updateFilters({ generation: value })}
      />
    </Stack>
  );
};

export default Filter;
