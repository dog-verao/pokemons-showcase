import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextFilter } from ".";

describe("TextFilter", () => {
  it("renders the label", () => {
    render(<TextFilter label="Name" />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders the current value", () => {
    render(<TextFilter label="Name" value="pikachu" />);

    expect(screen.getByLabelText("Name")).toHaveValue("pikachu");
  });

  it("calls onChange as the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TextFilter label="Name" value="" onChange={onChange} />);

    await user.type(screen.getByLabelText("Name"), "pika");

    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).toHaveBeenLastCalledWith("a");
  });
});
