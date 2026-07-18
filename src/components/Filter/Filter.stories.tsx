import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import Filter from ".";

const meta = {
  title: "Components/Filter",
  component: Filter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
