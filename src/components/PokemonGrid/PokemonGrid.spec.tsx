import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils";
import { PokemonGrid } from ".";
import * as pokemonAdapter from "../../api/pokemonAdapter";

const HEADLINE = "This is a Title";

vi.mock("../../api/pokemonAdapter", () => ({
  fetchPokemonList: vi.fn().mockResolvedValue({
    count: 0,
    next: null,
    previous: null,
    results: [],
  }),
  fetchPokemonByName: vi.fn(),
  getPokemonDetail: vi.fn(),
  getPokemonSummariesByType: vi.fn(),
  getPokemonSummariesByGeneration: vi.fn(),
}));

describe("PokemonGrid", () => {
  it("Should show headline when title exists", () => {
    renderWithProviders(<PokemonGrid headline={HEADLINE} />);

    expect(screen.getByText(HEADLINE)).toBeInTheDocument();
  });

  it("requests the next page when pagination is used", async () => {
    const user = userEvent.setup();

    vi.mocked(pokemonAdapter.fetchPokemonList).mockResolvedValue({
      count: 45,
      next: null,
      previous: null,
      results: [{ name: "pikachu", url: "" }],
    });
    vi.mocked(pokemonAdapter.getPokemonDetail).mockResolvedValue({
      id: 25,
      name: "pikachu",
      imageUrl: null,
      types: [],
    });

    renderWithProviders(<PokemonGrid />);

    const pageTwoButton = await screen.findByRole("button", {
      name: "Go to page 2",
    });
    await user.click(pageTwoButton);

    await waitFor(() => {
      expect(pokemonAdapter.fetchPokemonList).toHaveBeenLastCalledWith(
        20,
        20,
      );
    });
  });

  it("renders the compact mobile layout on small screens", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderWithProviders(<PokemonGrid headline={HEADLINE} />);

    expect(screen.getByText(HEADLINE)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open filters" }),
    ).toBeInTheDocument();

    window.matchMedia = originalMatchMedia;
  });
});