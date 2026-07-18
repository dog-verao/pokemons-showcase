import React from "react";
import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";
import type { AutocompleteProps } from "./Autocomplete.types";

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  label,
  value = null,
  onChange,
}) => {
  return (
    <MuiAutocomplete
      options={options}
      value={value}
      onChange={(_event, newValue) => onChange?.(newValue)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
