import React from "react";
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getPokemonTypeColor } from "../../theme/theme";
import type { TypeChipProps } from "./TypeChip.types";

export const TypeChip: React.FC<TypeChipProps> = ({ type, size = "small" }) => {
  const theme = useTheme();

  return (
    <Chip
      label={`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
      size={size}
      sx={{
        bgcolor: getPokemonTypeColor(theme, type),
        color: "#fff",
      }}
    />
  );
};
