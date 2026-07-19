import React from "react";
import { Typography as BaseTypography } from "@mui/material";
import type { TypographyProps } from "./Typography.types";

export const Typography: React.FC<TypographyProps> = ({
  fontSize,
  color,
  children,
  sx,
}) => {
  return (
    <BaseTypography
      sx={{
        fontSize,
        color,
        ...sx,
      }}
    >
      {children}
    </BaseTypography>
  );
};
