import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import { POKEMON_TYPE_COLORS } from "../../theme/pokemonTypeColors";
import PokemonCard from ".";

const PIKACHU = {
  id: 25,
  name: "pikachu",
  imageUrl: "https://example.com/pikachu.png",
  types: ["electric"],
};

describe("PokemonCard", () => {
  it("renders name, dex number and types", () => {
    renderWithProviders(<PokemonCard pokemon={PIKACHU} />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("#025")).toBeInTheDocument();
    expect(screen.getByText("Electric")).toBeInTheDocument();
  });

  it("colors the type chip using the theme's pokemon type palette", () => {
    renderWithProviders(<PokemonCard pokemon={PIKACHU} />);

    const chip = screen.getByText("Electric").closest(".MuiChip-root");
    expect(chip).toHaveStyle({
      backgroundColor: POKEMON_TYPE_COLORS.electric,
    });
  });

  it("derives the generation from the dex number", () => {
    renderWithProviders(<PokemonCard pokemon={PIKACHU} />);

    expect(screen.getByText("Generation I")).toBeInTheDocument();
  });

  it("renders the image with the pokemon name as alt text", () => {
    renderWithProviders(<PokemonCard pokemon={PIKACHU} />);

    expect(screen.getByAltText("pikachu")).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    renderWithProviders(<PokemonCard pokemon={PIKACHU} href="/pokemon/pikachu" />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/pokemon/pikachu",
    );
  });

  it("does not render as a link when href is omitted", () => {
    renderWithProviders(<PokemonCard pokemon={PIKACHU} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
