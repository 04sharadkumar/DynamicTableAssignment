import type { Meta, StoryObj } from "@storybook/react";
import  InputField  from "./InputField";

const meta: Meta<typeof InputField> = {
  component: InputField,
  title: "Components/InputField",
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: { label: "Name", placeholder: "Enter your name" },
};

export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};
