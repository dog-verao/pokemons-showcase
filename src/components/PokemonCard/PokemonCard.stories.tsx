import type { Meta, StoryObj } from "@storybook/react-vite";

import PokemonCard from ".";

const meta = {
  title: "Components/PokemonCard",
  component: PokemonCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pokemon: {
      id: 25,
      name: "pikachu",
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      types: ["electric"],
    },
  },
};

export const MultipleTypes: Story = {
  args: {
    pokemon: {
      id: 6,
      name: "charizard",
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      types: ["fire", "flying"],
    },
  },
};

export const Linkable: Story = {
  args: {
    pokemon: {
      id: 25,
      name: "pikachu",
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      types: ["electric"],
    },
    href: "/pokemon/pikachu",
  },
};

export const NoImage: Story = {
  args: {
    pokemon: {
      id: 132,
      name: "ditto",
      imageUrl: null,
      types: ["normal"],
    },
  },
};
