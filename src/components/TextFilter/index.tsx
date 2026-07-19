import React from "react";
import { TextField } from "@mui/material";
import type { TextFilterProps } from "./TextFilter.types";

export const TextFilter: React.FC<TextFilterProps> = ({
  label,
  value = "",
  onChange,
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      fullWidth
    />
  );
};
