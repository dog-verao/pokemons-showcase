import { createTheme, lighten } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { POKEMON_TYPE_COLORS } from "./pokemonTypeColors";
import type { PokemonTypeFilter } from "../components/Filter/Filter.types";

declare module "@mui/material/styles" {
  interface Theme {
    pokemonTypes: Record<PokemonTypeFilter, string>;
  }
  interface ThemeOptions {
    pokemonTypes?: Record<PokemonTypeFilter, string>;
  }
}

export const theme = createTheme({
  pokemonTypes: POKEMON_TYPE_COLORS,
});

export function getPokemonTypeColor(
  theme: Theme,
  type: string,
): string {
  return theme.pokemonTypes[type as PokemonTypeFilter] ?? theme.pokemonTypes.normal;
}

export function getPokemonTypeGradient(theme: Theme, mainType: string): string {
  const base = getPokemonTypeColor(theme, mainType);
  return `linear-gradient(135deg, ${lighten(base, 0.9)} 0%, ${lighten(base, 0.8)} 45%, ${lighten(base, 0.65)} 100%)`;
}
