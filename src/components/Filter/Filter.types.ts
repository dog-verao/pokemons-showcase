export const POKEMON_TYPES = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
] as const;
export type PokemonTypeFilter = (typeof POKEMON_TYPES)[number];

export const POKEMON_GENERATIONS = [
  "generation-i",
  "generation-ii",
  "generation-iii",
  "generation-iv",
  "generation-v",
  "generation-vi",
  "generation-vii",
  "generation-viii",
  "generation-ix",
] as const;
export type PokemonGeneration = (typeof POKEMON_GENERATIONS)[number];

export type FilterTypes = "type" | "name" | "generation";

export type FilterProps = {
  type: FilterTypes;
  value: string | number;
};

export type FilterComponentProps = {
  onChange?: (filter: FilterProps) => void;
};
