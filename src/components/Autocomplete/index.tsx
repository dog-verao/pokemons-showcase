import React from "react";
import { Autocomplete as BaseAutocomplete, TextField } from "@mui/material";
import type { AutocompleteProps } from "./Autocomplete.types";

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  label,
  value = [],
  onChange,
}) => {
  const handlePressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      const inputValue: string = target.value.trim();

      if (inputValue && options.includes(inputValue)) {
        onChange?.([...value, inputValue]);
      }
    }
  };

  return (
    <BaseAutocomplete
      sx={{ width: "100%" }}
      multiple
      onKeyDown={handlePressEnter}
      options={options}
      value={value}
      onChange={(_event, newValue) => onChange?.(newValue)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
