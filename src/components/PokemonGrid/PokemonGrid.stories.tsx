import type { Meta, StoryObj } from "@storybook/react-vite";

import { PokemonGrid } from ".";

const meta = {
  title: "Components/PokemonGrid",
  component: PokemonGrid,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PokemonGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHeadline: Story = {
  args: {
    headline: "These are our Pokemon",
  },
};

export const WithoutHeadline: Story = {
  args: {},
};
