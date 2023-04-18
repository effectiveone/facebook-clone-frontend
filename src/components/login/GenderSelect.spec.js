import { render, screen, fireEvent } from "@testing-library/react";
import GenderSelect from "./GenderSelect";

describe("GenderSelect component", () => {
  test("should render GenderSelect component", () => {
    render(<GenderSelect />);
    const genderSelectComponent = screen.getByTestId("gender-select");
    expect(genderSelectComponent).toBeInTheDocument();
  });

  test("should render male, female, and custom radio buttons", () => {
    render(<GenderSelect />);
    const maleButton = screen.getByLabelText("Male");
    const femaleButton = screen.getByLabelText("Female");
    const customButton = screen.getByLabelText("Custom");
    expect(maleButton).toBeInTheDocument();
    expect(femaleButton).toBeInTheDocument();
    expect(customButton).toBeInTheDocument();
  });

  test("should call handleRegisterChange when a radio button is selected", () => {
    const handleRegisterChange = jest.fn();
    render(<GenderSelect handleRegisterChange={handleRegisterChange} />);
    const maleButton = screen.getByLabelText("Male");
    fireEvent.click(maleButton);
    expect(handleRegisterChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("should render genderError message when genderError prop is provided", () => {
    render(<GenderSelect genderError="Please select a gender" />);
    const error = screen.getByText("Please select a gender");
    expect(error).toBeInTheDocument();
  });
});
