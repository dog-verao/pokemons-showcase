import React, { useEffect, useRef, useState } from "react";
import { Typography } from "../Typography";
import {
  IconButton,
  Drawer,
  Pagination,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const filterFields = (
    <Stack
      component="fieldset"
      spacing={2}
      sx={{
        border: 0,
        m: 0,
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: isMobile ? 0 : 1,
      }}
    >
      <Typography
        component="legend"
        sx={{
          p: 0,
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
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
        siblingCount={0}
        boundaryCount={1}
      />
    </Stack>
  );

  if (!isMobile) {
    return filterFields;
  }

  return (
    <>
      <IconButton
        onClick={() => setDrawerOpen(true)}
        color="primary"
        aria-label="Open filters"
      >
        <FilterListIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 300, p: 2 } } }}
      >
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        {filterFields}
      </Drawer>
    </>
  );
};

export default Filter;
