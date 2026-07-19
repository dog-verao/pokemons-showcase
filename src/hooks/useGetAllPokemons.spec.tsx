import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useGetAllPokemons } from "./useGetAllPokemons";
import { INITIAL_FILTER_STATE } from "../components/Filter/Filter.types";
import * as pokemonAdapter from "../api/pokemonAdapter";

vi.mock("../api/pokemonAdapter", () => ({
  fetchPokemonList: vi.fn(),
  fetchPokemonByName: vi.fn(),
  getPokemonDetail: vi.fn(),
  getPokemonSummariesByType: vi.fn(),
  getPokemonSummariesByGeneration: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useGetAllPokemons", () => {
  it("resolves a pokemon when the exact name filter matches", async () => {
    vi.mocked(pokemonAdapter.fetchPokemonByName).mockResolvedValue({
      id: 132,
      name: "ditto",
      sprites: { front_default: null },
      types: [],
    });
    vi.mocked(pokemonAdapter.getPokemonDetail).mockResolvedValue({
      id: 132,
      name: "ditto",
      imageUrl: null,
      types: [],
    });

    const { result } = renderHook(
      () =>
        useGetAllPokemons(
          { ...INITIAL_FILTER_STATE, name: "ditto" },
          { page: 0, pageSize: 20 },
        ),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pokemons).toEqual([
      { id: 132, name: "ditto", imageUrl: null, types: [] },
    ]);
    expect(result.current.total).toBe(1);
  });

  it("resolves no pokemon when the name filter doesn't match", async () => {
    vi.mocked(pokemonAdapter.fetchPokemonByName).mockRejectedValue(
      new Error("PokeAPI error 404: /pokemon/not-a-real-pokemon"),
    );

    const { result } = renderHook(
      () =>
        useGetAllPokemons(
          { ...INITIAL_FILTER_STATE, name: "not-a-real-pokemon" },
          { page: 0, pageSize: 20 },
        ),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.pokemons).toEqual([]);
    expect(result.current.total).toBe(0);
  });
});
