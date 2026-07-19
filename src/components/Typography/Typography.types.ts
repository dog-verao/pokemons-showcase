import type { TypographyProps as MuiTypographyProps } from "@mui/material/Typography";

export type TypographyProps = Omit<MuiTypographyProps, "color"> & {
  fontSize?: CSSStyleDeclaration["fontSize"];
  color?: CSSStyleDeclaration["color"];
};
