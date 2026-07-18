import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import Filter from ".";

const meta = {
  title: "Components/Filter",
  component: Filter,
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
  argTypes: {
    typeOptions: { control: "object" },
    generationOptions: { control: "object" },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomOptions: Story = {
  args: {
    typeOptions: ["first option", "second option", "third option"],
    generationOptions: ["fourth option", "fifth option", "sixth option"],
  },
};
