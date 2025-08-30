import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";
import '@testing-library/jest-dom';


describe("InputField", () => {
  it("renders with label and placeholder", () => {
    render(<InputField label="Name" placeholder="Enter name" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("shows error message when invalid", () => {
    render(<InputField label="Email" invalid errorMessage="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("clears input when clear button clicked", () => {
    const handleChange = jest.fn();
    render(<InputField value="Hello" onChange={handleChange} clearable />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("toggles password visibility", () => {
    render(<InputField type="password" passwordToggle />);
    const input = screen.getByPlaceholderText("") as HTMLInputElement;
    const toggleBtn = screen.getByRole("button");
    fireEvent.click(toggleBtn);
    expect(input.type).toBe("text");
  });
});
