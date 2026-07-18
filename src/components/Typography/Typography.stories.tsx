import type { Meta, StoryObj } from "@storybook/react-vite";

import { Typography } from ".";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fontSize: { control: "text" },
    color: { control: "color" },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Bulbasaur",
  },
};

export const CustomFontSize: Story = {
  args: {
    children: "Bulbasaur",
    fontSize: "2rem",
  },
};

export const CustomColor: Story = {
  args: {
    children: "Bulbasaur",
    color: "#2e7d32",
  },
};
