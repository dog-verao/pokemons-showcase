import type { PokemonGeneration } from "../components/Filter/Filter.types";

const GENERATION_ID_RANGES: [number, number, PokemonGeneration][] = [
  [1, 151, "generation-i"],
  [152, 251, "generation-ii"],
  [252, 386, "generation-iii"],
  [387, 493, "generation-iv"],
  [494, 649, "generation-v"],
  [650, 721, "generation-vi"],
  [722, 809, "generation-vii"],
  [810, 905, "generation-viii"],
  [906, 1025, "generation-ix"],
];

export function getPokemonGeneration(
  id: number,
): PokemonGeneration | undefined {
  return GENERATION_ID_RANGES.find(
    ([min, max]) => id >= min && id <= max,
  )?.[2];
}

export function formatGenerationLabel(generation: PokemonGeneration): string {
  return `Generation ${generation.replace("generation-", "").toUpperCase()}`;
}
