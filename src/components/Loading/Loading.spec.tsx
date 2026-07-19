import { render, screen } from "@testing-library/react";
import { Loading } from ".";

describe("Loading", () => {
  it("renders with an accessible status role and default label", () => {
    render(<Loading />);

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("uses a custom label when provided", () => {
    render(<Loading label="Fetching Pokemon" />);

    expect(
      screen.getByRole("status", { name: "Fetching Pokemon" }),
    ).toBeInTheDocument();
  });
});
