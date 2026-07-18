import { render, screen } from "@testing-library/react";
import { Typography } from "./index";

describe("Typography", () => {
  it("renders its children", () => {
    render(<Typography>Bulbasaur</Typography>);

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  });
});
