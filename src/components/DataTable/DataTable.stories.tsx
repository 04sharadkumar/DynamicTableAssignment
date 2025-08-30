import type { Meta, StoryObj } from "@storybook/react";
import DataTable, {type Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const sampleData: User[] = [
  { id: 1, name: "Alice", age: 24, email: "alice@mail.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@mail.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@mail.com" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};
