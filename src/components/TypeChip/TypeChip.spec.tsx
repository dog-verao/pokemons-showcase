import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils";
import { POKEMON_TYPE_COLORS } from "../../theme/pokemonTypeColors";
import { TypeChip } from ".";

describe("TypeChip", () => {
  it("renders a capitalized label", () => {
    renderWithProviders(<TypeChip type="electric" />);

    expect(screen.getByText("Electric")).toBeInTheDocument();
  });

  it("colors the chip using the theme's pokemon type palette", () => {
    renderWithProviders(<TypeChip type="water" />);

    const chip = screen.getByText("Water").closest(".MuiChip-root");
    expect(chip).toHaveStyle({
      backgroundColor: POKEMON_TYPE_COLORS.water,
    });
  });

  it("falls back to the normal type color for an unknown type", () => {
    renderWithProviders(<TypeChip type="unknown-type" />);

    const chip = screen.getByText("Unknown-type").closest(".MuiChip-root");
    expect(chip).toHaveStyle({
      backgroundColor: POKEMON_TYPE_COLORS.normal,
    });
  });
});
