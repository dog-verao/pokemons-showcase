import React, { useEffect, useRef, useState } from "react";
import { Typography } from "../Typography";
import { Pagination, Stack } from "@mui/material";
import { Autocomplete } from "../Autocomplete";
import {
  INITIAL_FILTER_STATE,
  POKEMON_GENERATIONS,
  POKEMON_TYPES,
} from "./Filter.types";
import type { FilterComponentProps, FilterState } from "./Filter.types";
import { TextFilter } from "../TextFilter";

const NAME_DEBOUNCE_MS = 600;

const Filter: React.FC<FilterComponentProps> = ({
  onChange,
  typeOptions = [...POKEMON_TYPES],
  generationOptions = [...POKEMON_GENERATIONS],
  page = 0,
  pageCount = 1,
  onPageChange,
}) => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);

  const updateFilters = (patch: Partial<FilterState>) => {
    const next = { ...filters, ...patch };
    setFilters(next);

    clearTimeout(debounceTimer.current);

    if ("name" in patch) {
      debounceTimer.current = setTimeout(
        () => onChange?.(next),
        NAME_DEBOUNCE_MS,
      );
    } else {
      onChange?.(next);
    }
  };

  return (
    <Stack component="fieldset" spacing={2} sx={{ border: 0, m: 0, p: 0 }}>
      <Typography component="legend" sx={{ p: 0 }}>
        Filters
      </Typography>
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
      <TextFilter
        label="Name"
        value={filters.name}
        onChange={(value) => updateFilters({ name: value })}
      />
      <Pagination
        count={pageCount}
        page={page + 1}
        onChange={(_event, value) => onPageChange?.(value - 1)}
      />
    </Stack>
  );
};

export default Filter;
