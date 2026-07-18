import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Autocomplete } from ".";

const OPTIONS = ["fire", "water", "grass"];

describe("Autocomplete", () => {
  it("renders the label", () => {
    render(<Autocomplete label="Type" options={OPTIONS} />);

    expect(screen.getByLabelText("Type")).toBeInTheDocument();
  });

  it("renders selected values as chips", () => {
    render(<Autocomplete label="Type" options={OPTIONS} value={["fire"]} />);

    expect(screen.getByText("fire")).toBeInTheDocument();
  });

  it("calls onChange with the newly selected option added", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Autocomplete
        label="Type"
        options={OPTIONS}
        value={["fire"]}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByLabelText("Type"));
    await user.click(await screen.findByRole("option", { name: "water" }));

    expect(onChange).toHaveBeenCalledWith(["fire", "water"]);
  });

  it("adds the typed value on Enter when it matches an option exactly", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Autocomplete
        label="Type"
        options={OPTIONS}
        value={[]}
        onChange={onChange}
      />,
    );

    const input = screen.getByLabelText("Type");
    await user.type(input, "grass{Enter}");

    expect(onChange).toHaveBeenCalledWith(["grass"]);
  });
});
