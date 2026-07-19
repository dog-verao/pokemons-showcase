import { render, screen } from "@testing-library/react";
import PokemonCard from ".";

const PIKACHU = {
  id: 25,
  name: "pikachu",
  imageUrl: "https://example.com/pikachu.png",
  types: ["electric"],
};

describe("PokemonCard", () => {
  it("renders name, dex number and types", () => {
    render(<PokemonCard pokemon={PIKACHU} />);

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("#025")).toBeInTheDocument();
    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("derives the generation from the dex number", () => {
    render(<PokemonCard pokemon={PIKACHU} />);

    expect(screen.getByText("Generation I")).toBeInTheDocument();
  });

  it("renders the image with the pokemon name as alt text", () => {
    render(<PokemonCard pokemon={PIKACHU} />);

    expect(screen.getByAltText("pikachu")).toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(<PokemonCard pokemon={PIKACHU} href="/pokemon/pikachu" />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/pokemon/pikachu",
    );
  });

  it("does not render as a link when href is omitted", () => {
    render(<PokemonCard pokemon={PIKACHU} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
