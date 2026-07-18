import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from ".";

describe("Filter", () => {
  it("renders a filter for type and generation", () => {
    render(<Filter />);

    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Generation")).toBeInTheDocument();
  });

  it("reports the full filter state when a type is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Filter onChange={onChange} />);

    await user.click(screen.getByLabelText("Type"));
    await user.click(await screen.findByRole("option", { name: "fire" }));

    expect(onChange).toHaveBeenCalledWith({
      type: ["fire"],
      generation: [],
      name: "",
    });
  });

  it("reports the full filter state when a generation is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Filter onChange={onChange} />);

    await user.click(screen.getByLabelText("Generation"));
    await user.click(
      await screen.findByRole("option", { name: "generation-i" }),
    );

    expect(onChange).toHaveBeenCalledWith({
      type: [],
      generation: ["generation-i"],
      name: "",
    });
  });
});
