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

const Filter: React.FC<FilterComponentProps> = ({
  onChange,
  typeOptions = [...POKEMON_TYPES],
  generationOptions = [...POKEMON_GENERATIONS],
}) => {
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
        options={typeOptions}
        value={filters.type}
        onChange={(value) => updateFilters({ type: value })}
      />
      <Autocomplete
        label="Generation"
        options={generationOptions}
        value={filters.generation}
        onChange={(value) => updateFilters({ generation: value })}
      />
    </Stack>
  );
};

export default Filter;
