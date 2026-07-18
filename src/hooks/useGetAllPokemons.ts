import { useQueries, useQuery } from "@tanstack/react-query";
import {
  fetchPokemonList,
  getPokemonDetail,
  getPokemonSummariesByGeneration,
  getPokemonSummariesByType,
} from "../api/pokemonAdapter";
import type { Pokemon, PokemonSummary } from "../api/types";
import type { FilterState } from "../components/Filter/Filter.types";

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type UseGetAllPokemonsResult = {
  pokemons: Pokemon[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.type.length > 0 ||
    filters.generation.length > 0 ||
    filters.name.trim().length > 0
  );
}

function unionByName(sets: PokemonSummary[][]): PokemonSummary[] {
  const seen = new Map<string, PokemonSummary>();
  for (const set of sets) {
    for (const summary of set) {
      seen.set(summary.name, summary);
    }
  }
  return [...seen.values()];
}

function intersectByName(
  a: PokemonSummary[],
  b: PokemonSummary[],
): PokemonSummary[] {
  const namesInB = new Set(b.map((summary) => summary.name));
  return a.filter((summary) => namesInB.has(summary.name));
}

async function getFilteredCandidates(
  filters: FilterState,
): Promise<PokemonSummary[]> {
  let candidates: PokemonSummary[] | null = null;

  if (filters.type.length > 0) {
    const sets = await Promise.all(
      filters.type.map((type) => getPokemonSummariesByType(type)),
    );
    candidates = unionByName(sets);
  }

  if (filters.generation.length > 0) {
    const sets = await Promise.all(
      filters.generation.map((generation) =>
        getPokemonSummariesByGeneration(generation),
      ),
    );
    const generationCandidates = unionByName(sets);
    candidates =
      candidates === null
        ? generationCandidates
        : intersectByName(candidates, generationCandidates);
  }

  if (candidates === null) {
    candidates = [];
  }

  if (filters.name.trim()) {
    const query = filters.name.trim().toLowerCase();
    candidates = candidates.filter((summary) =>
      summary.name.toLowerCase().includes(query),
    );
  }

  return candidates;
}

export function useGetAllPokemons(
  filters: FilterState,
  { page, pageSize }: PaginationParams,
): UseGetAllPokemonsResult {
  const filtered = hasActiveFilters(filters);
  const offset = page * pageSize;

  const unfilteredListQuery = useQuery({
    queryKey: ["pokemonList", page, pageSize],
    queryFn: () => fetchPokemonList(pageSize, offset),
    enabled: !filtered,
  });

  const filteredCandidatesQuery = useQuery({
    queryKey: ["pokemonCandidates", filters],
    queryFn: () => getFilteredCandidates(filters),
    enabled: filtered,
  });

  const names = filtered
    ? (filteredCandidatesQuery.data ?? [])
        .slice(offset, offset + pageSize)
        .map((summary) => summary.name)
    : (unfilteredListQuery.data?.results ?? []).map((summary) => summary.name);

  const total = filtered
    ? (filteredCandidatesQuery.data?.length ?? 0)
    : (unfilteredListQuery.data?.count ?? 0);

  const detailQueries = useQueries({
    queries: names.map((name) => ({
      queryKey: ["pokemonDetail", name],
      queryFn: () => getPokemonDetail(name),
    })),
  });

  const listQuery = filtered ? filteredCandidatesQuery : unfilteredListQuery;

  return {
    pokemons: detailQueries
      .map((query) => query.data)
      .filter((pokemon): pokemon is Pokemon => pokemon !== undefined),
    total,
    isLoading:
      listQuery.isLoading || detailQueries.some((query) => query.isLoading),
    isError: listQuery.isError || detailQueries.some((query) => query.isError),
    error:
      listQuery.error ??
      (detailQueries.find((query) => query.error)?.error as Error | null) ??
      null,
  };
}
