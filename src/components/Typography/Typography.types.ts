import type { SxProps, Theme } from "@mui/material/styles";

export type TypographyProps = {
  fontSize?: CSSStyleDeclaration["fontSize"];
  color?: CSSStyleDeclaration["color"];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};
