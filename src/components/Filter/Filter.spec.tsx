import { fireEvent, render, screen } from "@testing-library/react";
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

  it("debounces the name filter instead of reporting on every keystroke", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();

    render(<Filter onChange={onChange} />);

    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "p" } });
    fireEvent.change(input, { target: { value: "pi" } });
    fireEvent.change(input, { target: { value: "pik" } });

    expect(onChange).not.toHaveBeenCalled();

    vi.advanceTimersByTime(600);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      type: [],
      generation: [],
      name: "pik",
    });

    vi.useRealTimers();
  });

  it("reports the selected page when pagination is used", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Filter page={0} pageCount={3} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "Go to page 2" }));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
