import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { TextFilter } from ".";

const meta = {
  title: "Components/TextFilter",
  component: TextFilter,
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
} satisfies Meta<typeof TextFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    label: "Name",
    value: "",
  },
};

export const WithValue: Story = {
  args: {
    label: "Name",
    value: "pikachu",
  },
};
