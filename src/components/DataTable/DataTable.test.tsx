import { render, screen, fireEvent } from "@testing-library/react";
import DataTable, {type Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const sampleData: User[] = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 },
];

describe("DataTable", () => {
  it("renders data correctly", () => {
    render(<DataTable data={sampleData} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<DataTable data={[]} columns={columns} loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("allows row selection", () => {
    const handleSelect = jest.fn();
    render(
      <DataTable data={sampleData} columns={columns} selectable onRowSelect={handleSelect} />
    );
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    expect(handleSelect).toHaveBeenCalled();
  });

  it("sorts by column when clicked", () => {
    render(<DataTable data={sampleData} columns={columns} />);
    const header = screen.getByText("Age");
    fireEvent.click(header);
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Alice"); // youngest first
  });
});
