import type { Meta, StoryObj } from "@storybook/react-vite";

import { Loading } from ".";

const meta = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: {
    label: "Fetching Pokemon",
  },
};

export const Small: Story = {
  args: {
    size: 80,
  },
};
