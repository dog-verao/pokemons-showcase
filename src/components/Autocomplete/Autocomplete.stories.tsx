import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Autocomplete } from ".";

const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    label: "Type",
    options: ["fire", "water", "grass", "electric"],
    value: [],
  },
};

export const WithSelection: Story = {
  args: {
    label: "Type",
    options: ["fire", "water", "grass", "electric"],
    value: ["fire", "water"],
  },
};
