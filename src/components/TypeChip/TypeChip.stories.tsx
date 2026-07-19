import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "@mui/material";

import { TypeChip } from ".";
import { POKEMON_TYPES } from "../Filter/Filter.types";

const meta = {
  title: "Components/TypeChip",
  component: TypeChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TypeChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fire: Story = {
  args: { type: "fire" },
};

export const Water: Story = {
  args: { type: "water" },
};

export const AllTypes: Story = {
  args: { type: "fire" },
  render: () => (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", maxWidth: 500 }}>
      {POKEMON_TYPES.map((type) => (
        <TypeChip key={type} type={type} />
      ))}
    </Stack>
  ),
};
