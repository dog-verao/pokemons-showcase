import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import { PokemonGrid } from ".";

const HEADLINE = "This is a Title";

vi.mock("../../api/pokemonAdapter", () => ({
  fetchPokemonList: vi.fn().mockResolvedValue({
    count: 0,
    next: null,
    previous: null,
    results: [],
  }),
  getPokemonDetail: vi.fn(),
  getPokemonSummariesByType: vi.fn(),
  getPokemonSummariesByGeneration: vi.fn(),
}));

describe("PokemonGrid", () => {
  it("Should show headline when title exists", () => {
    renderWithProviders(<PokemonGrid headline={HEADLINE} />);

    expect(screen.getByText(HEADLINE)).toBeInTheDocument();
  });
});