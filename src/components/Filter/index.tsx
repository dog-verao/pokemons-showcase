import React, { useState } from "react";
import { Typography } from "@/Typography";
import { Stack } from "@mui/material";
import { Autocomplete } from "@/components/Autocomplete";
import { POKEMON_TYPES } from "./Filter.types";
import type { FilterComponentProps } from "./Filter.types";

const Filter: React.FC<FilterComponentProps> = ({ onChange }) => {
  const [type, setType] = useState<string | null>(null);

  const handleTypeChange = (value: string | null) => {
    setType(value);
    if (value) {
      onChange?.({ type: "type", value });
    }
  };

  return (
    <Stack spacing={2}>
      <Typography>Filters</Typography>
      <Autocomplete
        label="Type"
        options={[...POKEMON_TYPES]}
        value={type}
        onChange={handleTypeChange}
      />
    </Stack>
  );
};

export default Filter;
